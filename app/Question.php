<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    public function qa_sessions(){
        return $this->hasMany(QA_session::class);
    }
}
