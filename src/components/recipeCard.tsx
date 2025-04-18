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
import Rating from '@mui/material/Rating'

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
        <Card sx={{
            border: '1px solid lightgray',
            maxHeight: '100%',
            maxWidth: '90%', borderRadius: 2
        }}>
            <CardHeader
                sx={{
                    height: 85,
                    justifySelf: 'center'
                }}
                title={recipe.title ? recipe.title : "Shrimp and Chorizo Paella"}
            />
            <CardMedia
                component="img"
                sx={{
                    width: '100%',
                    maxHeight: '250px',
                    minHeight: '200px',
                    objectFit: 'cover',
                    marginBottom: 2,
                    cursor: 'pointer',
                }}
                image={recipe.image ? recipe.image : "https://st4.depositphotos.com/13349494/27992/i/450/depositphotos_279925888-stock-photo-top-view-raw-meat-fish.jpg"}
                alt={recipe.title ? recipe.title : "Shrimp and Chorizo Paella"}
                onClick={() => onClick(recipe)}
            />
            <CardActions disableSpacing>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <IconButton aria-label="add to favorites" onClick={() => isInFavorites ? removeFromFavorites(recipe.id) : addToFavorites(recipe.id)}>
                        {isInFavorites ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <Rating
                        name="simple-uncontrolled"
                        onChange={(event, newValue) => {
                            //console.log(newValue);
                        }}
                        defaultValue={recipe.ratings}
                    />
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
