export type PassportActivity = { id: number; badgeKey: string; badgeName: string };
export type PassportCompletion = { activityId: number; awardedPoints: number };

export function summarizePassport(completions: PassportCompletion[], activities: PassportActivity[]) {
  const completedIds = completions.map(completion => completion.activityId);
  const activityById = new Map(activities.map(activity => [activity.id, activity]));
  const badges = completions.flatMap(completion => {
    const activity = activityById.get(completion.activityId);
    return activity ? [{ key: activity.badgeKey, name: activity.badgeName }] : [];
  });
  return {
    completedIds,
    totalPoints: completions.reduce((sum, completion) => sum + completion.awardedPoints, 0),
    badges,
    activityCount: activities.length,
  };
}

export function canAwardCompletion(existingCompletion: boolean) {
  return !existingCompletion;
}
