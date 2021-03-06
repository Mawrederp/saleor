import { parse as parseQs } from "qs";
import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import { WindowTitle } from "../components/WindowTitle";
import i18n from "../i18n";
import PageCreate from "./views/PageCreate";
import PageDetailsComponent from "./views/PageDetails";
import PageListComponent, { PageListQueryParams } from "./views/PageList";

const PageList: React.StatelessComponent<RouteComponentProps<any>> = ({
  location
}) => {
  const qs = parseQs(location.search.substr(1));
  const params: PageListQueryParams = {
    after: qs.after,
    before: qs.before
  };
  return <PageListComponent params={params} />;
};
const PageDetails: React.StatelessComponent<RouteComponentProps<any>> = ({
  match
}) => {
  return <PageDetailsComponent id={match.params.id} />;
};

const Component = ({ match }) => (
  <>
    <WindowTitle title={i18n.t("Pages")} />
    <Switch>
      <Route exact path={match.url} component={PageList} />
      <Route exact path={`${match.url}/add/`} component={PageCreate} />
      <Route exact path={`${match.url}/:id/`} component={PageDetails} />
    </Switch>
  </>
);

export function pageEditUrl(id: string) {
  return `/pages/${id}/`;
}

export function pageStorefrontUrl(slug: string) {
  return `/page/${slug}/`;
}

export const pageListUrl = "/pages/";
export const pageAddUrl = "/pages/add/";

export default Component;
