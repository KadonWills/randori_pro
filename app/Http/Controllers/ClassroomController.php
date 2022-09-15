<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use App\Http\Requests\StoreClassroomRequest;
use App\Http\Requests\UpdateClassroomRequest;
use Exception;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class ClassroomController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Classrooms',
            [
                "classrooms" => $this->classroomsPaginationData()
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
     * @param  \App\Http\Requests\StoreClassroomRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreClassroomRequest $request)
    {
        try {
            $classroom = Classroom::create($request->all());
            Session::flash('message', $classroom->name." classroom was created successfully !");
            return redirect()->back();
        } catch (Exception $ex) {
            Session::flash('message', "An error occurred \n Error: ". $ex->getMessage());
            return redirect()->back()->withErrors($ex->getMessage());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Classroom  $classroom
     * @return \Illuminate\Http\Response
     */
    public function show(Classroom $classroom)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Classroom  $classroom
     * @return \Illuminate\Http\Response
     */
    public function edit(Classroom $classroom)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(HttpRequest $request, $id)
    {
        try {
            $classroom = Classroom::find($id);
            $classroom->update($request->all());
            Session::flash('message', $classroom->name." classroom was created successfully !");
            return redirect()->back();
        } catch (Exception $ex) {
            Session::flash('message', "An error occurred \n ". $ex->getMessage());
            return redirect()->back()->withErrors($ex->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $classroom =  Classroom::find($id);
            // TODO: implement soft deletes
            $classroom->delete();
            Session::flash("message", "Successfully deleted classroom : ".$classroom->name);
            return redirect()->back();
        } catch (Exception $ex) {
            Session::flash('message', $ex->getMessage());
            return redirect()->back();
        }
    }

    public function classroomsPaginationData()
    {
        return Classroom::query()
        ->when(Request::input("search"), function ($query, $search) {
            $query->where("name", "like", '%'.$search.'%')
                ->orWhere("description", "like", '%'.$search.'%');
        })
        // ->with(['role', 'subscription'])
        ->paginate(10)
        ->through(fn($data) => [
            "id" => $data->id,
            "name" => $data->name,
            "description" => $data->description,
            "image" => $data->image,
            "space" => $data->space,
        ]);

    }
}
