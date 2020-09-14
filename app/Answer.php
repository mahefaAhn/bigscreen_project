<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    protected $fillable = [
        'content'
    ];
    
    //Questions
    public function questions(){
        return $this->belongsTo(Question::class);
    }

    //Users
    public function users(){
        return $this->belongsTo(User::class);
    }
}
