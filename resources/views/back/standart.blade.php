@extends('layouts.masterAdmin')

@section('pageTitle')
{{$active}}
@endsection

@section('content')
<input type="hidden" id="activePage" name="activePage" value="{{$active}}"/>
<div id="admin_content"></div>
@endsection