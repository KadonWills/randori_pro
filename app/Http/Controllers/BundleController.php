<?php

namespace App\Http\Controllers;

use App\Models\Bundle;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as FacadesRequest;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class BundleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Bundles', [
            "bundles" => $this->bundlesPaginationData()
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
            $b = Bundle::create($request->all());
            Session::flash('message', $b->name." bundle was created successfully !");
            return redirect()->back();
        } catch (Exception $ex) {
            Session::flash('message', "An error occurred \n Error: ". $ex->getMessage());
            return redirect()->back()->withErrors($ex->getMessage());
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
            $b = Bundle::find($id);
            $b->update($request->all());
            Session::flash('message', $b->name." bundle was created successfully !");
            return redirect()->back();
        } catch (Exception $ex) {
            Session::flash('message', "An error occurred \n Error: ". $ex->getMessage());
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
            $b =  Bundle::find($id);
            // TODO: implement soft deletes
            $b->delete();
            Session::flash("message", "Successfully deleted user : ".$b->name);
            return redirect()->back();
        } catch (Exception $ex) {
            Session::flash('message', $ex->getMessage());
            return redirect()->back();
        }
    }

    public function bundlesPaginationData()
    {
        return Bundle::query()
        ->when(FacadesRequest::input("search"), function ($query, $search) {
            $query->where("name", "like", '%'.$search.'%')
                ->orWhere("description", "like", '%'.$search.'%')
                ->orWhere("price", "like", '%'.$search.'%');
        })
        // ->with(['role', 'subscription'])
        ->paginate(10)
        ->through(fn($bundle) => [
            "id" => $bundle->id,
            "name" => $bundle->name,
            "description" => $bundle->description,
            "active" => $bundle->active,
            "price" => $bundle->price,
            "image" => $bundle->image,
            "has_discount" => $bundle->has_discount,
            "discount_price" => $bundle->discount_price,
            "discount_end_date" => $bundle->discount_end_date,
        ]);

    }
}
