import { mockSupportMessages } from '../../components/mockData';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('search') || '';

  let filteredMessages = [...mockSupportMessages];

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

  const sortedMessages = filteredMessages.sort((a, b) => b.importance - a.importance);

  await new Promise(resolve => setTimeout(resolve, 500));

  return Response.json(sortedMessages);
}

export async function POST(request) {
  const { action, id } = await request.json();

  if (action === 'reactAll') {
    return Response.json({ success: true, message: 'Reacted to all messages' });
  } else if (action === 'react' && id) {
    return Response.json({ success: true, message: `Reacted to message ${id}` });
  }

  return Response.json({ success: false, message: 'Invalid action' }, { status: 400 });
}
