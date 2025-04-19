import { mockAlerts } from '../../components/mockData';

export async function GET(request) {
  // Get the search parameter from the URL
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('search') || '';

  // In a real app, this would fetch data from a database
  // For now, we'll use our mock data and filter based on search term
  let filteredAlerts = [...mockAlerts];

  // Apply search filter if a search term is provided
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

  // Sort by importance
  const sortedAlerts = filteredAlerts.sort((a, b) => b.importance - a.importance);

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
