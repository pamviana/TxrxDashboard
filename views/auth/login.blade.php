@extends('layouts.app')

@section('content')


<div class="login-page">
    <div class="login-box">
        <img id="logo" alt="logo" src="https://www.txrxdata.com/wp-content/uploads/2021/09/TxRxdata_draft_logo_5.svg"></img>


        <form class="login-form" method="POST" action="{{ route('login') }}">

            @csrf
            <h1>{{ __('Log In') }}</h1>
            <div class="inputs-container">
                <label for="email" class="col-md-4 col-form-label text-md-end" hidden>{{ __('E-Mail Address') }}</label>

                <input id="email" type="email" placeholder="Email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>


                <div class="error-msg-div">
                    @error('email')
                    <span class="invalid-feedback" role="alert">
                        {{ $message }}
                    </span>
                    @enderror
                </div>


                <label for="password" class="col-md-4 col-form-label text-md-end" hidden>{{ __('Password') }}</label>

                <input id="password" type="password" placeholder="Password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password">


                <div class="error-msg-div">
                    @error('password')
                    <span class="invalid-feedback" role="alert">
                        {{ $message }}
                    </span>
                    @enderror
                </div>


            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                <label class="form-check-label" for="remember">
                    {{ __('Remember Me') }}
                </label>
            </div>

            <button type="submit" class="button-login">
                {{ __('Log In') }}
            </button>


            <div class="bottom-login-box">


                @if (Route::has('register'))
                <a class="btn btn-link" href="{{ route('register') }}">{{ __('Create an account') }}</a>
                @endif

                @if (Route::has('password.request'))
                <a class="btn btn-link" href="{{ route('password.request') }}">
                    {{ __('Forgot Your Password?') }}
                </a>
                @endif

            </div>

        </form>
    </div>
</div>

@endsection