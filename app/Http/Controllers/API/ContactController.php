<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    /**
     * Store a newly created contact message in database.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'max:255'],
            'message' => ['required', 'string', 'min:5', 'max:5000'],
        ]);

        $message = Message::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Your message has been sent successfully!',
            'data' => $message,
        ], 201);
    }
}
