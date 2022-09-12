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
            $u = new User($request->all());
            $u->create();

            return redirect()->route('users');

        } catch (Exception $ex) {
            Session::flash('message', $ex->getMessage());
            return redirect()->route('users')->with("errors" , [$ex->getMessage()]);
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
        //
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
            $user =  User::where('id',$id)->first();
            $user->delete();
            return redirect()->route('users');
        } catch (Exception $ex) {
            Session::flash('message', $ex->getMessage());
            return redirect()->route('users')->with('errors', [$ex->getMessage()]);
        }
    }


    public function usersPaginationData()
    {
        return User::query()
        ->when(FacadesRequest::input("search"), function ($query, $search) {
            $query->where("first_name", "like", '%'.$search.'%')
                ->orWhere("last_name", "like", '%'.$search.'%')
                ->orWhere("email", "like", '%'.$search.'%')
                ->orWhere("status", "like", '%'.$search.'%');

        })
        // ->with(['role', 'subscription'])
        ->paginate(10)
        ->through(fn($user) => [
            "id" => $user->id,
            "name" => $user->first_name.' '.$user->last_name,
            "email" => $user->email,
            "role" => $user->role->name,
            "phone" => $user->phone,
            "active" => $user->active,
            "status" => $user->status,
            "age" => today()->get('year') -  intval(explode('-',$user->dob)[0]),
            "Subscription" => $user->subscriptions->last(),
        ]);

    }
}
