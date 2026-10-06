import { siteConfig } from "@/content/site";
import type { Locale } from "@/lib/i18n";

/**
 * Privacy policy (Québec Law 25 / Loi 25).
 * Placeholders in [brackets] are filled from content/site.ts when available.
 * Have this text reviewed by a legal professional before launch.
 */
export type PolicySection = { heading: string; paragraphs?: string[]; list?: string[] };

const or = (value: string, placeholder: string) => value || placeholder;

export function getPrivacyPolicy(locale: Locale): { intro: string; sections: PolicySection[] } {
  const { privacyOfficer, legal, contact, name } = siteConfig;
  const company = or(legal.companyName, locale === "fr" ? "[Raison sociale de l’entreprise]" : "[Legal company name]");

  if (locale === "fr") {
    const officer = or(privacyOfficer.name, "[Nom du responsable de la protection des renseignements personnels]");
    const officerTitle = or(privacyOfficer.title, "[Titre / fonction]");
    const officerEmail = or(privacyOfficer.email || contact.email, "[Courriel du responsable]");
    return {
      intro: `${name} (exploitée par ${company}) accorde une grande importance à la protection de vos renseignements personnels. La présente politique explique quels renseignements nous recueillons, pourquoi, comment nous les protégeons et quels sont vos droits, conformément à la Loi sur la protection des renseignements personnels dans le secteur privé du Québec, telle que modifiée par la Loi 25.`,
      sections: [
        {
          heading: "1. Responsable de la protection des renseignements personnels",
          paragraphs: [
            `La personne responsable de la protection des renseignements personnels est : ${officer}, ${officerTitle}.`,
            `Pour toute question, demande d’accès, de rectification ou plainte, vous pouvez la joindre à l’adresse suivante : ${officerEmail}.`,
          ],
        },
        {
          heading: "2. Renseignements que nous recueillons",
          paragraphs: ["Nous recueillons uniquement les renseignements que vous nous transmettez volontairement :"],
          list: [
            "Formulaire de soumission : nom, entreprise, courriel, téléphone, site web actuel, secteur d’activité, service recherché, budget approximatif, objectifs et message.",
            "Réservation de consultation : les renseignements que vous saisissez dans l’outil de réservation Calendly (nom, courriel et, le cas échéant, réponses à ses questions).",
            "Mesure d’audience : des statistiques de visite agrégées et anonymes (pages consultées, provenance, type d’appareil), sans témoins (cookies) ni identification personnelle.",
          ],
        },
        {
          heading: "3. Finalités",
          list: [
            "Répondre à votre demande et préparer une soumission personnalisée.",
            "Vous contacter pour discuter de votre projet, si vous y avez consenti.",
            "Planifier et tenir une consultation que vous avez réservée.",
            "Améliorer le contenu et le fonctionnement du site à partir de statistiques anonymes.",
          ],
          paragraphs: ["Nous ne vendons, ne louons ni n’échangeons vos renseignements personnels. Nous ne les utilisons pas à d’autres fins sans votre consentement, sauf exception prévue par la loi."],
        },
        {
          heading: "4. Consentement",
          paragraphs: [
            "En remplissant le formulaire et en cochant la case prévue à cet effet, vous consentez à ce que nous utilisions vos renseignements aux fins décrites ci-dessus. Vous pouvez retirer votre consentement en tout temps en écrivant à la personne responsable.",
          ],
        },
        {
          heading: "5. Fournisseurs et communication hors Québec",
          paragraphs: [
            "Pour exploiter le site, nous faisons appel à des fournisseurs de services qui peuvent traiter ou héberger des renseignements à l’extérieur du Québec. Avant toute communication, nous évaluons que ces fournisseurs offrent une protection adéquate, conformément à la loi :",
          ],
          list: [
            "Vercel Inc. (États-Unis) — hébergement du site.",
            "Notion Labs Inc. (États-Unis) — stockage et gestion des demandes de soumission.",
            "Calendly LLC (États-Unis) — prise de rendez-vous, uniquement si vous ouvrez le calendrier.",
            "Plausible Analytics (Union européenne) — mesure d’audience anonyme et sans témoins, si elle est activée.",
          ],
        },
        {
          heading: "6. Témoins (cookies) et technologies similaires",
          paragraphs: [
            "Notre site n’utilise pas de témoins de suivi publicitaire. La mesure d’audience Plausible fonctionne sans témoins et ne permet pas de vous identifier.",
            "Le calendrier Calendly n’est chargé que si vous cliquez pour l’afficher ; il peut alors déposer ses propres témoins, régis par la politique de confidentialité de Calendly.",
          ],
        },
        {
          heading: "7. Conservation",
          paragraphs: [
            "Les demandes de soumission sont conservées le temps nécessaire au traitement de votre demande et à notre éventuelle relation d’affaires, puis au plus [durée de conservation, ex. 24 mois] après le dernier contact, à moins qu’une durée plus longue ne soit exigée par la loi. Elles sont ensuite détruites ou anonymisées de façon sécuritaire.",
          ],
        },
        {
          heading: "8. Sécurité",
          paragraphs: [
            "Nous appliquons des mesures de sécurité raisonnables : connexion chiffrée (HTTPS), accès restreint aux seules personnes qui en ont besoin, clés d’accès conservées côté serveur et fournisseurs reconnus. En cas d’incident de confidentialité présentant un risque de préjudice sérieux, nous aviserons les personnes concernées et la Commission d’accès à l’information.",
          ],
        },
        {
          heading: "9. Vos droits",
          paragraphs: ["Conformément à la loi, vous pouvez :"],
          list: [
            "accéder aux renseignements personnels que nous détenons sur vous ;",
            "en demander la rectification s’ils sont inexacts, incomplets ou équivoques ;",
            "retirer votre consentement à leur utilisation ;",
            "demander la cessation de leur diffusion ou leur désindexation, dans les cas prévus par la loi ;",
            "obtenir, sur demande, la communication de vos renseignements dans un format technologique structuré et couramment utilisé ;",
            "déposer une plainte auprès de la Commission d’accès à l’information du Québec.",
          ],
        },
        {
          heading: "10. Modifications",
          paragraphs: [
            "Nous pouvons mettre à jour cette politique. La date de dernière mise à jour figure en haut de la page. Les modifications importantes seront signalées sur le site.",
          ],
        },
      ],
    };
  }

  const officer = or(privacyOfficer.name, "[Name of the person in charge of the protection of personal information]");
  const officerTitle = or(privacyOfficer.title, "[Title / role]");
  const officerEmail = or(privacyOfficer.email || contact.email, "[Privacy officer email]");
  return {
    intro: `${name} (operated by ${company}) takes the protection of your personal information seriously. This policy explains what information we collect, why, how we protect it and what your rights are, in accordance with Québec’s Act respecting the protection of personal information in the private sector, as amended by Law 25.`,
    sections: [
      {
        heading: "1. Person in charge of the protection of personal information",
        paragraphs: [
          `The person in charge of the protection of personal information is: ${officer}, ${officerTitle}.`,
          `For any question, access or correction request, or complaint, please contact: ${officerEmail}.`,
        ],
      },
      {
        heading: "2. Information we collect",
        paragraphs: ["We only collect information you choose to provide:"],
        list: [
          "Quote form: name, company, email, phone, current website, industry, service needed, approximate budget, goals and message.",
          "Consultation booking: the information you enter in the Calendly booking tool (name, email and any answers to its questions).",
          "Audience measurement: aggregated, anonymous visit statistics (pages viewed, referrer, device type), with no cookies and no personal identification.",
        ],
      },
      {
        heading: "3. Purposes",
        list: [
          "Responding to your request and preparing a tailored quote.",
          "Contacting you to discuss your project, if you have consented.",
          "Scheduling and holding a consultation you booked.",
          "Improving the site’s content and operation using anonymous statistics.",
        ],
        paragraphs: ["We do not sell, rent or trade your personal information, and we do not use it for any other purpose without your consent, except where permitted by law."],
      },
      {
        heading: "4. Consent",
        paragraphs: [
          "By completing the form and checking the corresponding box, you consent to our use of your information for the purposes described above. You may withdraw your consent at any time by writing to the person in charge.",
        ],
      },
      {
        heading: "5. Service providers and transfers outside Québec",
        paragraphs: [
          "To operate this site, we rely on service providers that may process or host information outside Québec. Before any transfer, we assess that these providers offer adequate protection, as required by law:",
        ],
        list: [
          "Vercel Inc. (United States) — website hosting.",
          "Notion Labs Inc. (United States) — storage and management of quote requests.",
          "Calendly LLC (United States) — appointment booking, only if you open the calendar.",
          "Plausible Analytics (European Union) — anonymous, cookie-free audience measurement, if enabled.",
        ],
      },
      {
        heading: "6. Cookies and similar technologies",
        paragraphs: [
          "Our site does not use advertising or tracking cookies. Plausible analytics works without cookies and cannot identify you.",
          "The Calendly calendar only loads if you click to display it; it may then set its own cookies, governed by Calendly’s privacy policy.",
        ],
      },
      {
        heading: "7. Retention",
        paragraphs: [
          "Quote requests are kept as long as needed to handle your request and any resulting business relationship, and no longer than [retention period, e.g. 24 months] after our last contact, unless a longer period is required by law. They are then securely destroyed or anonymized.",
        ],
      },
      {
        heading: "8. Security",
        paragraphs: [
          "We apply reasonable security measures: encrypted connections (HTTPS), access limited to those who need it, server-side API keys and reputable providers. If a confidentiality incident presents a risk of serious injury, we will notify the affected individuals and the Commission d’accès à l’information.",
        ],
      },
      {
        heading: "9. Your rights",
        paragraphs: ["Under the law, you may:"],
        list: [
          "access the personal information we hold about you;",
          "request corrections if it is inaccurate, incomplete or equivocal;",
          "withdraw your consent to its use;",
          "request that its dissemination cease or that it be de-indexed, where provided by law;",
          "obtain your information, on request, in a structured, commonly used technological format;",
          "file a complaint with the Commission d’accès à l’information du Québec.",
        ],
      },
      {
        heading: "10. Changes",
        paragraphs: [
          "We may update this policy. The last-updated date appears at the top of the page. Significant changes will be highlighted on the site.",
        ],
      },
    ],
  };
}
