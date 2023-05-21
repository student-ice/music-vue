import moment from 'moment'

export function formatDuration(dt) {
    let min = Math.ceil(dt / 1000 / 60)
    min = min < 10 ? '0' + min : min
    let sec = Math.ceil((dt / 1000) % 60)
    sec = sec < 10 ? '0' + sec : sec
    return min + ':' + sec
}

export function formatTime(time) {
    return moment(time).format('YYYY-MM-DD hh:mm:ss')
}

export function formatCount(count) {
    if (count / 10000 > 10) {
        return parseInt(count / 10000) + '万'
    } else {
        return count
    }
}