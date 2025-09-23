// Vercel Edge API function - more compatible format
export default function handler(request) {
  const url = new URL(request.url);
  
  // Simple in-memory counter (resets on deployment)
  let count = 4;
  
  // Handle CORS
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    let responseData;
    
    switch (request.method) {
      case 'GET':
        responseData = { count };
        break;
      case 'POST':
        count++;
        responseData = { count };
        break;
      case 'DELETE':
        count = 0;
        responseData = { count: 0 };
        break;
      default:
        return new Response(
          JSON.stringify({ error: 'Method not allowed' }), 
          { status: 405, headers: corsHeaders }
        );
    }
    
    return new Response(
      JSON.stringify(responseData), 
      { status: 200, headers: corsHeaders }
    );
    
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Server error', message: error.message }), 
      { status: 500, headers: corsHeaders }
    );
  }
}

export const config = {
  runtime: 'edge',
};