<?php

namespace App\Http\Middleware;

use Closure;

class TokenMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $token = $request->header('Authorization');
        if (!$token) {
            return response()->json([
                'message' => 'Token not provided.'
            ], 401);
        }
        return $next($request);
    }
}
