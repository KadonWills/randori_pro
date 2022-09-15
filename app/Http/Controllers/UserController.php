<?php

namespace App\Http\Controllers;

use App\Models\Classroom;
use App\Models\Role;
use App\Models\User;
use Exception;
use \Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as FacadesRequest;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Users',
        [
            "users" => $this->usersPaginationData(),
            "classrooms" => Classroom::all(),
            "roles" => Role::all()
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            //TODO: change all except('status') to all()
            $request->classroom_id = intval($request->classroom_id) || null;
            $u = User::create($request->except('status'));
            Session::flash('message', $u->first_name." was created successfully !");
            return redirect()->route('users');
        } catch (Exception $ex) {
            Session::flash('message', "An error occurred \n Error: ". $ex->getMessage());
            return redirect()->route('users')->withErrors($ex->getMessage());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
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
    public function update(Request $request, $id)
    {
        try {
            $u = User::find($id);
            $u->update($request->except('status'));
            Session::flash("message", "Successfully updated user : ".$u->first_name);
            //return redirect()->route('users');
            return redirect()->back();
        } catch (Exception $ex) {
            Session::flash("error" , $ex->getMessage());
            return redirect()->route('users');
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
            $user =  User::find($id);
            // TODO: implement soft deletes
            $user->delete();
            Session::flash("message", "Successfully deleted user : ".$user->first_name);
            return redirect()->route('users');
        } catch (Exception $ex) {
            Session::flash('error', $ex->getMessage());
            return redirect()->route('users');
        }
    }


    public function usersPaginationData()
    {
        return User::query()
        ->when(FacadesRequest::input("search"), function ($query, $search) {
            $query
            ->where("email", "like", '%'.$search.'%');
            //->orWhere("first_name", "like", '%'.$search.'%')
              //  ->orWhere("last_name", "like", '%'.$search.'%')
                // ->orWhere("status", "like", '%'.$search.'%');

        })
        // ->with(['role', 'subscription'])
        ->paginate(10)
        ->through(fn($user) => [
            "id" => $user->id,
            "name" => $user->first_name.' '.$user->last_name,
            "first_name" => $user->first_name,
            "last_name" => $user->last_name,
            "email" => $user->email,
            "photo" => $user->photo,
            "role" => $user->role->name,
            "role_id" => $user->role_id,
            "classroom_id" => $user->classroom_id,
            "phone" => $user->phone,
            "gender" => $user->gender,
            "active" => $user->active,
            "status" => $user->status,
            "dob" => $user->dob,
            "age" => today()->get('year') -  intval(explode('-',$user->dob)[0]),
            "subscription" => $user->subscriptions->last() ?? "-",
        ]);

    }
}
