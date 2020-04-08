import {Component, Host, h, Prop} from "@stencil/core";
import {Page} from "../../api";
import {getFilterKeyFromPage} from "../../utils/filters";
import {filterMetadataByOptionByName} from "../../utils/filter-data";

@Component({tag: "docs-choose-anchor"})
export class DocsChooseAnchor {
  /*** the current page's data */
  @Prop() readonly page?: Page;

  render() {
    const filterKey = this.page && getFilterKeyFromPage(this.page);

    return (
      <Host>
        <amplify-responsive-grid
          gridGap={1}
          columns={4}
          class="border-radius margin-top-md"
        >
          {filterKey &&
            Object.entries(filterMetadataByOptionByName[filterKey]).map(
              ([filterValue, {label, graphicURI}]) => {
                const route =
                  this.page &&
                  `${this.page.route}/q/${filterKey}/${filterValue}`;

                return (
                  <amplify-card key={label} vertical url={route}>
                    <img
                      slot="graphic"
                      src={graphicURI}
                      alt={`${label} Logo`}
                    />
                    <h4 slot="heading">{label}</h4>
                  </amplify-card>
                );
              },
            )}
        </amplify-responsive-grid>
      </Host>
    );
  }
}
