import { mockAlerts } from '../../components/mockData';

export async function GET() {
  // In a real app, this would fetch data from a database
  // For now, we'll use our mock data
  const sortedAlerts = [...mockAlerts].sort((a, b) => b.importance - a.importance);

  // Simulate a delay to mimic a real API call
  await new Promise(resolve => setTimeout(resolve, 500));

  return Response.json(sortedAlerts);
}

export async function POST(request) {
  const { action, id } = await request.json();

  // In a real app, this would update the database
  // For now, we'll just return a success response
  if (action === 'resolveAll') {
    return Response.json({ success: true, message: 'All alerts resolved' });
  } else if (action === 'resolve' && id) {
    return Response.json({ success: true, message: `Alert ${id} resolved` });
  }

  return Response.json({ success: false, message: 'Invalid action' }, { status: 400 });
}
