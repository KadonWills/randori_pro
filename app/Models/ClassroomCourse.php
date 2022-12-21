<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassroomCourse extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];

    public function classrooms()
    {
        return $this->belongsTo(Classroom::class);
    }

    public function courses()
    {
        return $this->belongsTo(Course::class);
    }

}
