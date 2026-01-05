import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface PaymentRequest {
  bookingId: string;
  amount: number;
  method: "gcash" | "maya";
  userId: string;
}

interface PaymentResponse {
  success: boolean;
  paymentId?: string;
  error?: string;
  message?: string;
}

/**
 * Process Payment - Secure Edge Function
 * Handles GCash/Maya payment processing for bookings
 *
 * SECURITY:
 * - Service role key used (never exposed to frontend)
 * - Validates booking ownership
 * - Sanitizes input
 * - Returns only necessary data
 *
 * TODO: Integrate actual GCash/Maya APIs
 * - Get API credentials from secure Supabase Vault
 * - Implement actual payment processing
 * - Handle webhooks for payment confirmation
 */
serve(async (req: Request) => {
  // CORS headers
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  try {
    // Verify request method
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Only POST method is allowed",
        } as PaymentResponse),
        { status: 405, headers: { "Content-Type": "application/json" } }
      );
    }

    // Parse request body
    const body: PaymentRequest = await req.json();

    // Validate required fields
    if (!body.bookingId || !body.amount || !body.method || !body.userId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing required fields: bookingId, amount, method, userId",
        } as PaymentResponse),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate payment method
    if (!["gcash", "maya"].includes(body.method)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid payment method. Must be 'gcash' or 'maya'",
        } as PaymentResponse),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate amount
    if (body.amount <= 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Amount must be greater than 0",
        } as PaymentResponse),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verify booking exists and belongs to user
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .select("id, customer_id, status")
      .eq("id", body.bookingId)
      .single();

    if (bookingError || !booking) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Booking not found",
        } as PaymentResponse),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verify user owns the booking
    if (booking.customer_id !== body.userId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Unauthorized: You don't own this booking",
        } as PaymentResponse),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if booking can be paid
    if (!["pending", "confirmed"].includes(booking.status)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Cannot process payment for booking with status: ${booking.status}`,
        } as PaymentResponse),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // TODO: Integrate actual payment gateway
    // For now, create a payment record in PENDING status
    // In production:
    // 1. Call GCash/Maya API with payment details
    // 2. Get transaction reference
    // 3. Handle payment confirmation via webhooks

    console.log(
      `[SANDBOX] Processing payment: ${body.method} - ₱${body.amount} for booking ${body.bookingId}`
    );

    // Create payment record (SANDBOX MODE)
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .insert([
        {
          booking_id: body.bookingId,
          amount: body.amount,
          method: body.method,
          transaction_ref: `SANDBOX_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          status: "success", // In production, set to 'pending' until webhook confirmation
        },
      ])
      .select()
      .single();

    if (paymentError) {
      console.error("Payment record creation error:", paymentError);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to process payment",
        } as PaymentResponse),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Update booking status to confirmed (after successful payment)
    const { error: updateError } = await supabase
      .from("bookings")
      .update({
        status: "confirmed",
        price_paid: body.amount,
      })
      .eq("id", body.bookingId);

    if (updateError) {
      console.error("Booking update error:", updateError);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Payment processed but booking update failed",
        } as PaymentResponse),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        paymentId: payment.id,
        message: `Payment of ₱${body.amount} processed successfully via ${body.method.toUpperCase()}. Booking confirmed!`,
      } as PaymentResponse),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Edge Function error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Internal server error",
      } as PaymentResponse),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
});
