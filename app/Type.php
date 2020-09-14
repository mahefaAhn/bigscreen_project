<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    //Question
    public function questions(){
        return $this->hasMany(Question::class);
    }
}
