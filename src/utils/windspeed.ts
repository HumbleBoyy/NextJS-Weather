export function convertWindSpeed(speedInMetersPerSecond: number): string {
    const speedInKmSsPerHour = speedInMetersPerSecond * 3.6
    return `${speedInKmSsPerHour.toFixed(0)}km\h`
}