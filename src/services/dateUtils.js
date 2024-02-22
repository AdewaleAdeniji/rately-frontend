export function generateDateStrings(numDays) {
    const today = new Date();
    const dateStrings = [];
  
    for (let i = 0; i < numDays; i++) {
      const currentDate = new Date();
      currentDate.setDate(today.getDate() - i);
  
      const formattedDate = currentDate.toISOString().slice(0, 10); // YYYY-MM-DD
      const daysAgo = i === 0 ? 'today' : `${i} day${i > 1 ? 's' : ''} ago`;
  
      dateStrings.push({
        date: i === 0 ? "" : formattedDate,
        dateString: daysAgo,
      });
    }
  
    return dateStrings;
  }