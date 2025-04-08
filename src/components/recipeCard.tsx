import { Recipe } from '../api/models/types'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import CardMedia from '@mui/material/CardMedia'
import CardActions from '@mui/material/CardActions'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Box from '@mui/material/Box'
import { useUserStore } from '../store/userStore'

type Props = {
    recipe: Recipe,
    onClick: (_: Recipe) => void,
}

function RecipeCard({ recipe, onClick }: Props) {
    const savedRecipes = useUserStore(state => state.savedRecipes)
    const addToFavorites = useUserStore(state => state.addToFavorites)
    const removeFromFavorites = useUserStore(state => state.removeFromFavorites)
    const isInFavorites = savedRecipes.includes(recipe.id)

    return (
        <Card sx={{ border: '1px solid lightgray', borderRadius: 2, }}>
            <CardHeader
                title={recipe.title ? recipe.title : "Shrimp and Chorizo Paella"}
            />
            <CardMedia
                component="img"
                height="194"
                image={recipe.image ? recipe.image : "https://st4.depositphotos.com/13349494/27992/i/450/depositphotos_279925888-stock-photo-top-view-raw-meat-fish.jpg"}
                alt={recipe.title ? recipe.title : "Shrimp and Chorizo Paella"}
                onClick={() => onClick(recipe)}
            />
            <CardActions disableSpacing>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <IconButton aria-label="add to favorites" onClick={() => isInFavorites ? removeFromFavorites(recipe.id) : addToFavorites(recipe.id)}>
                        {isInFavorites ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <Box>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                    </Box>
                </Box>
            </CardActions>
        </Card>
    )
}

export default RecipeCard
