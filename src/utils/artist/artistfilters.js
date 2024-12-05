export function textfilter(is_music, is_album, is_community, msg){
    if(is_music && !msg){
        return 'capa da sua música '
    }
    else if(is_album && !msg){
        return 'capa do seu album'
    }
    else if(is_community && !msg){
        return 'foto da sua comunidade'
    }
}

export function filterclasses(is_music, is_album, is_community, msg){
    if(is_music && !msg){
        return 'w-80 h-80 text-white flex flex-col gap-2 justify-center items-center '
    }
    else if(is_album && !msg){
        return 'w-80 h-80 text-white flex flex-col gap-2 justify-center items-center '
    }
    else if(is_community, !msg){
        return 'w-60 h-60 text-white flex flex-col gap-2 justify-center items-center '
    }
}