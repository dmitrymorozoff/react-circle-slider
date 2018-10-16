export const pathGenerator = (
    center: number,
    radius: number,
    direction: number,
    x: number,
    y: number,
): string => {
    const points = [];
    points.push("M" + center);
    points.push(center + radius);
    points.push("A");
    points.push(radius);
    points.push(radius);
    points.push(0);
    points.push(direction);
    points.push(1);
    points.push(x);
    points.push(y);
    return points.join(" ");
};
