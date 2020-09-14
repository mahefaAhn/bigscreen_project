<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = [
        'title','input_type','type_id'
    ];

    // Types
    public function types(){
        return $this->belongsTo(Type::class);
    }

    // Options
    public function options(){
        return $this->belongsTo(Option::class);
    }

    // Answers
    public function answers(){
        return $this->hasMany(Answer::class);
    }
}
