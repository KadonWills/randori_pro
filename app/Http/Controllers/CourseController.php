<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use Exception;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Courses', [
            "courses" => $this->coursesPaginationData()
        ]);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreCourseRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCourseRequest $request)
    {
        try {
            $course = Course::create($request->all());
            Session::flash('message', $course->title." course was created successfully !");
            return redirect()->back();
        } catch (Exception $ex) {
            Session::flash('message', "An error occurred \n Error: ". $ex->getMessage());
            return redirect()->back()->withErrors($ex->getMessage());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function show(Course $course)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function edit(Course $course)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCourseRequest  $request
     * @param  int  $course
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCourseRequest $request,  $id)
    {
        try {
            $course = Course::find($id);
            $course->update($request->all());
            Session::flash('message', $course->title." course was created successfully !");
            return redirect()->back();
        } catch (Exception $ex) {
            Session::flash('message', "An error occurred \n ". $ex->getMessage());
            return redirect()->back()->withErrors($ex->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $course
     * @return \Illuminate\Http\Response
     */
    public function destroy( $id)
    {
        try {
            $course =  Course::find($id);
            // TODO: implement soft deletes
            $course->delete();
            Session::flash("message", "Successfully deleted course : ".$course->title);
            return redirect()->back();
        } catch (Exception $ex) {
            Session::flash('message', $ex->getMessage());
            return redirect()->back();
        }
    }

    public function coursesPaginationData()
    {
        return Course::query()
        ->when(Request::input("search"), function ($query, $search) {
            $query->where("title", "like", '%'.$search.'%')
                ->orWhere("description", "like", '%'.$search.'%');
        })
        // ->with(['role', 'subscription'])
        ->paginate(10)
        ->through(fn($bundle) => [
            "id" => $bundle->id,
            "title" => $bundle->title,
            "description" => $bundle->description,
            "active" => $bundle->active,
            "image" => $bundle->image,
            "capacity" => $bundle->capacity,
        ]);

    }
}
