<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name', 'Amelia — Portfolio') }}</title>
    <meta name="description" content="Full-Stack Developer Portfolio — Crafting high-performance digital experiences.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet">
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    <style>
        *,
        *::before,
        *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            -webkit-font-smoothing: antialiased;
        }
    </style>
</head>

<body class="bg-[#020617] text-white antialiased">
    <div id="app"></div>
</body>

</html>