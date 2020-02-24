import api from 'axios'

export function getRandomCocktail(token) {
    return api.get('https://q72xj1k7vc.execute-api.us-west-2.amazonaws.com/dev/cocktail', { headers: { "Authorization": token, 'Accept': 'application/json', 'Content-Type': 'application/json' } })
}