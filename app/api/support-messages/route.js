import { mockSupportMessages } from '../../components/mockData';

export async function GET(request) {
  // Get the search parameter from the URL
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('search') || '';

  // In a real app, this would fetch data from a database
  // For now, we'll use our mock data and filter based on search term
  let filteredMessages = [...mockSupportMessages];

  // Apply search filter if a search term is provided
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    filteredMessages = filteredMessages.filter(
      message =>
        message.message.toLowerCase().includes(searchLower) ||
        message.channel.toLowerCase().includes(searchLower) ||
        message.user.toLowerCase().includes(searchLower) ||
        message.department.toLowerCase().includes(searchLower)
    );
  }

  // Sort by importance
  const sortedMessages = filteredMessages.sort((a, b) => b.importance - a.importance);

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
