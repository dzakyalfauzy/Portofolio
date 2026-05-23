<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ExperienceController extends Controller
{
    public function index()
    {
        return response()->json(Experience::orderBy('id', 'desc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'duration' => 'required|string|max:100',
            'description' => 'required|string',
            'stack' => 'nullable|array',
            'current' => 'required|boolean',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
        ]);

        $imageUrls = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $path = $file->store('experiences', 'public');
                $imageUrls[] = Storage::url($path);
            }
        }
        $validated['images'] = $imageUrls;

        $experience = Experience::create($validated);

        return response()->json([
            'message' => 'Experience created successfully',
            'experience' => $experience
        ], 201);
    }

    public function update(Request $request, Experience $experience)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'duration' => 'required|string|max:100',
            'description' => 'required|string',
            'stack' => 'nullable|array',
            'current' => 'required|boolean',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'existing_images' => 'nullable|array',
            'existing_images.*' => 'string',
        ]);

        // Determine which old images to keep
        $existingImages = $request->input('existing_images', []);
        $oldImages = $experience->images ?? [];

        // Delete removed images from storage
        foreach ($oldImages as $oldUrl) {
            if (!in_array($oldUrl, $existingImages)) {
                $oldPath = str_replace('/storage/', '', $oldUrl);
                Storage::disk('public')->delete($oldPath);
            }
        }

        // Upload new images
        $newImageUrls = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $path = $file->store('experiences', 'public');
                $newImageUrls[] = Storage::url($path);
            }
        }

        $validated['images'] = array_merge($existingImages, $newImageUrls);
        unset($validated['existing_images']);

        $experience->update($validated);

        return response()->json([
            'message' => 'Experience updated successfully',
            'experience' => $experience
        ]);
    }

    public function destroy(Experience $experience)
    {
        // Delete all images from storage
        if ($experience->images) {
            foreach ($experience->images as $url) {
                $path = str_replace('/storage/', '', $url);
                Storage::disk('public')->delete($path);
            }
        }

        $experience->delete();

        return response()->json([
            'message' => 'Experience deleted successfully'
        ]);
    }
}
