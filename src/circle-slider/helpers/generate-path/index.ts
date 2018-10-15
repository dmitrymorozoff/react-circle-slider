export const generatePath = (
    center: number,
    radius: number,
    direction: number,
    pathX: number,
    pathY: number,
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
    points.push(pathX);
    points.push(pathY);
    return points.join(" ");
};
