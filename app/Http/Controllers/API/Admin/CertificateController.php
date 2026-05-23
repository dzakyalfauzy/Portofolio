<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CertificateController extends Controller
{
    public function index()
    {
        return response()->json(Certificate::orderBy('id', 'desc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'issuer' => 'required|string|max:255',
            'date' => 'required|string|max:100',
            'credential' => 'nullable|string|max:255',
            'skills' => 'nullable|array',
            'verify_url' => 'nullable|url',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'category' => 'required|string|max:100',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('certificates', 'public');
            $validated['image_path'] = Storage::url($path);
        }

        $certificate = Certificate::create($validated);

        return response()->json([
            'message' => 'Certificate created successfully',
            'certificate' => $certificate
        ], 21);
    }

    public function update(Request $request, Certificate $certificate)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'issuer' => 'required|string|max:255',
            'date' => 'required|string|max:100',
            'credential' => 'nullable|string|max:255',
            'skills' => 'nullable|array',
            'verify_url' => 'nullable|url',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'category' => 'required|string|max:100',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image
            if ($certificate->image_path) {
                $oldPath = str_replace('/storage/', '', $certificate->image_path);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('image')->store('certificates', 'public');
            $validated['image_path'] = Storage::url($path);
        }

        $certificate->update($validated);

        return response()->json([
            'message' => 'Certificate updated successfully',
            'certificate' => $certificate
        ]);
    }

    public function destroy(Certificate $certificate)
    {
        if ($certificate->image_path) {
            $oldPath = str_replace('/storage/', '', $certificate->image_path);
            Storage::disk('public')->delete($oldPath);
        }

        $certificate->delete();

        return response()->json([
            'message' => 'Certificate deleted successfully'
        ]);
    }
}
