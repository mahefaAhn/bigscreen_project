<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class QA_session extends Model
{
    //Questions
    public function questions(){
        return $this->belongsTo(Question::class);
    }

    //Answers
    public function answers(){
        return $this->belongsTo(Answer::class);
    }

    //Public user
    public function public_users(){
        return $this->belongsTo(Public_user::class);
    }
}
