import { mockSupportMessages } from '../../components/mockData';

export async function GET() {
  // In a real app, this would fetch data from a database
  // For now, we'll use our mock data
  const sortedMessages = [...mockSupportMessages].sort((a, b) => b.importance - a.importance);

  // Simulate a delay to mimic a real API call
  await new Promise(resolve => setTimeout(resolve, 500));

  return Response.json(sortedMessages);
}

export async function POST(request) {
  const { action, id } = await request.json();

  // In a real app, this would update the database
  // For now, we'll just return a success response
  if (action === 'reactAll') {
    return Response.json({ success: true, message: 'Reacted to all messages' });
  } else if (action === 'react' && id) {
    return Response.json({ success: true, message: `Reacted to message ${id}` });
  }

  return Response.json({ success: false, message: 'Invalid action' }, { status: 400 });
}
