import React, { useContext } from "react";
import { observer } from "mobx-react";
import moment from "moment";

import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import FavoriteIcon from "@material-ui/icons/Favorite";

import trophy from "../../images/trophy.png";
import { routerConstString } from "../../const/menuConst";
import { Tournament } from "../../models/tournament";
import {
  TournamentLinkItemStyled,
  TournamentListItemTitleStyled,
  TournamentListItemDateStyled,
  TournamentListItemImgStyled,
  TournamentListItemStyled,
  TournamentListItemActionSideStyled,
} from "../../styled/styledTournament";

import { IconButtonStarStyled } from "../../styled/styledButtons";
import { UserStoreContext } from "../../store/UserStore";

type Props = {
  tournament: Tournament;
};

const TournamentSummary: React.FC<Props> = observer(({ tournament }) => {
  const usersStore = useContext(UserStoreContext);

  const favorite =
    tournament.id &&
    usersStore.loggedIn?.favoriteTournaments.includes(tournament.id);

  const my = usersStore.loggedIn?.login === tournament.owner;

  const handleToggleFavorites = () => {
    if (!favorite && usersStore.loggedIn && tournament.id) {
      usersStore.loggedIn.addFavoriteTournament(tournament.id);
    } else if (favorite && usersStore.loggedIn && tournament.id) {
      usersStore.loggedIn.removeFavoriteTournament(tournament.id);
    }
  };

  return (
    <TournamentListItemStyled button>
      <TournamentLinkItemStyled
        to={`${routerConstString.tournament}/${tournament.id}`}
      >
        <TournamentListItemImgStyled src={trophy} alt="logo" />
        <TournamentListItemTitleStyled>
          {tournament.name}
        </TournamentListItemTitleStyled>
      </TournamentLinkItemStyled>
      <TournamentListItemActionSideStyled>
        <TournamentListItemDateStyled>
          {moment(tournament.date).format("HH:mm")}
        </TournamentListItemDateStyled>
        {my ? (
          <IconButtonStarStyled aria-label="star">
            <FavoriteIcon fontSize="small" />
          </IconButtonStarStyled>
        ) : null}
        <IconButtonStarStyled aria-label="star" onClick={handleToggleFavorites}>
          {favorite ? (
            <StarIcon fontSize="small" />
          ) : (
            <StarBorderIcon fontSize="small" />
          )}
        </IconButtonStarStyled>
      </TournamentListItemActionSideStyled>
    </TournamentListItemStyled>
  );
});

export default TournamentSummary;
