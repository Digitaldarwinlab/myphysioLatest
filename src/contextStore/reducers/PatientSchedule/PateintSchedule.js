//Episode Id State
const episode = {
    pp_ed_id: ""
};
export const patCurrentEpisode = (state = episode, action) => {
    switch (action.type) {
        case "changeEpisodeId":
            return {
                pp_ed_id: action.payload.value
            }
        default:
            return {
                ...state
            }
    }
}