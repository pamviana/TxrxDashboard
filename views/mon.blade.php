<!-- @section('css')
{{-- can put css here --}} 
@endsection

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Dashboard') }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    {{ __('You are logged in!') }}
                </div>
            </div>
        </div>
    </div>
</div>
@endsection -->

<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OOT Monitor - Demo</title>

    <!-- FONTS -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap" rel="stylesheet">


    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <!-- script type="text/javascript" src="js/app.js></script -->
    <script src="{{ asset('js/app.js') }}" defer></script>
    <!-- Styles -->
    <link href="{{ asset('css/mon.styles.css') }}" rel="stylesheet">
</head>

<body>
    <header class="monitor-header">
        <div class="monitor-header-left-side">
            <div class="logo-header-dashboard">

                <a href="https://www.txrxdata.com/">
                    <img src="https://www.txrxdata.com/wp-content/uploads/2021/09/TxRxdata_draft_logo_5.svg" alt="Website logo to txrxdata.com" loading="logo"></img></a>
            </div>
            <p class="text-header-monitor">OTT Monitor | Demo Dashboard</p>

        </div>
        <div class="monitor-header-right-side">

            <button class="button-monitor-home button-monitor-header">Home</button>
            <a class="dropdown-item" href="{{ route('logout') }}" onclick="event.preventDefault();
                document.getElementById('logout-form').submit();">
                <button class="button-monitor-logout button-monitor-header">Log Out</button>
            </a>
            <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                @csrf
            </form>
        </div>
    </header>
    <div id="monitor"></div>
</body>

</html>