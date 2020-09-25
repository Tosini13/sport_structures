import React from "react";
import moment from "moment";

import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import ListItem from "@material-ui/core/ListItem";

import trophy from "../../images/trophy.png";
import { routerConstString } from "../../const/menuConst";
import { Tournament } from "../../models/tournament";
import {
  TournamentLinkItemStyled,
  TournamentListItemTitleStyled,
  TournamentListItemDateStyled,
  TournamentListItemImgStyled,
  TournamentListItemFavouriteStyled,
} from "../../styled/styledTournament";

type Props = {
  tournament: Tournament;
};

const TournamentSummary: React.FC<Props> = ({ tournament }) => {
  const favourite = false;
  return (
    <ListItem>
      <TournamentLinkItemStyled
        to={`${routerConstString.tournament}/${tournament.id}`}
      >
        <TournamentListItemImgStyled src={trophy} alt="logo" />
        <TournamentListItemTitleStyled>
          {tournament.name}
        </TournamentListItemTitleStyled>
        <div>
          <TournamentListItemDateStyled>
            {moment(tournament.date).format("HH:mm")}
          </TournamentListItemDateStyled>
          <TournamentListItemFavouriteStyled>
            {favourite ? <StarIcon /> : <StarBorderIcon />}
          </TournamentListItemFavouriteStyled>
        </div>
      </TournamentLinkItemStyled>
    </ListItem>
  );
};

export default TournamentSummary;
