import {service, emptyService} from "./AppService";

const backendService = {}

backendService.getCharacters = function (id) {
    return service({
        url: '/character/?page='+id,
        method: 'get'
    })
}

backendService.getCharacterDetail = function (id) {
    return service({
        url: '/character/'+id,
        method: 'get',
    })
}

backendService.getEpisodeInfo = function (url) {
    return emptyService({
        url,
        method: 'get',
    })
}

backendService.getFilterCharacter = function (info) {
    return service({
        url: '/character/?name='+info.name+"&status="+info.status+"&gender="+info.gender,
        method: 'get',
    })
}

export default backendService