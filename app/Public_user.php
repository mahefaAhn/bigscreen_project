<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Public_user extends Model
{
    public function answers(){
        return $this->hasMany(Anwser::class);
    }
}
