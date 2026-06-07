<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Certificate;
use App\Models\Experience;
use App\Models\Skill;
use Illuminate\Http\JsonResponse;

class PortfolioController extends Controller
{
    /**
     * Get all public portfolio data in one request.
     */
    public function index(): JsonResponse
    {
        return response()->json([
            'projects' => Project::orderBy('order')->orderBy('id')->get(),
            'certificates' => Certificate::orderBy('order')->orderBy('id')->get(),
            'experiences' => Experience::orderBy('order')->orderBy('id')->get(),
            'skills' => Skill::orderBy('order')->orderBy('id')->get(),
        ]);
    }

    /**
     * Get a single project by ID (public).
     */
    public function show($id): JsonResponse
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        return response()->json($project);
    }
}
