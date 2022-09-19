@extends('layouts.app')

@section('content')

<div class="login-page">
    <div class="register-box login-box">
        <img id="logo" alt="logo" src="https://www.txrxdata.com/wp-content/uploads/2021/09/TxRxdata_draft_logo_5.svg"></img>


        <form class="register-form login-form" method="POST" action="{{ route('register') }}">
            @csrf
            <h1>{{ __('Sign Up') }}</h1>
            <div class="inputs-container">
                <label for="name" class="col-md-4 col-form-label text-md-end" hidden>{{ __('Name') }}</label>

                <input id="name" type="text" placeholder="Name" class="form-control @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus>

                @error('name')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
                @enderror

                <label for="email" class="col-md-4 col-form-label text-md-end" hidden>{{ __('E-Mail Address') }}</label>

                <input id="email" type="email" placeholder="Email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email">

                @error('email')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
                @enderror

                <label for="password" class="col-md-4 col-form-label text-md-end" hidden>{{ __('Password') }}</label>

                <input id="password" type="password" placeholder="Password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password">

                @error('password')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
                @enderror
                <label for="password-confirm" class="col-md-4 col-form-label text-md-end" hidden>{{ __('Confirm Password') }}</label>

                <input id="password-confirm" type="password" placeholder="Confirm Password" class="form-control" name="password_confirmation" required autocomplete="new-password">


                <button type="submit" class="btn btn-primary button-login">
                    {{ __('Register') }}
                </button>
            </div>
        </form>

    </div>
</div>


@endsection