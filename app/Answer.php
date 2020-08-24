<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    public function qa_sessions(){
        return $this->hasMany(QA_session::class);
    }
}
