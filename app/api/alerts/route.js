import { mockAlerts } from '../../components/mockData';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('search') || '';

  let filteredAlerts = [...mockAlerts];

  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    filteredAlerts = filteredAlerts.filter(
      alert =>
        alert.message.toLowerCase().includes(searchLower) ||
        alert.channel.toLowerCase().includes(searchLower) ||
        (alert.tags && alert.tags.some(tag => tag.toLowerCase().includes(searchLower))) ||
        alert.department.toLowerCase().includes(searchLower)
    );
  }

  const sortedAlerts = filteredAlerts.sort((a, b) => b.importance - a.importance);

  await new Promise(resolve => setTimeout(resolve, 500));

  return Response.json(sortedAlerts);
}

export async function POST(request) {
  const { action, id } = await request.json();

  if (action === 'resolveAll') {
    return Response.json({ success: true, message: 'All alerts resolved' });
  } else if (action === 'resolve' && id) {
    return Response.json({ success: true, message: `Alert ${id} resolved` });
  }

  return Response.json({ success: false, message: 'Invalid action' }, { status: 400 });
}
