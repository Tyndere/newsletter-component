## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `theme` | string | `'dark'` | Color theme (`'dark'` or `'light'`) |
| `headline` | string | `'Want product news and updates?'` | Main headline text |
| `subHeadline` | string | `'Sign up for our newsletter.'` | Secondary headline text |
| `buttonText` | string | `'Subscribe'` | Text for the submit button |
| `privacyText` | string | `'We care about your data. Read our'` | Privacy note text |
| `privacyLinkText` | string | `'privacy policy'` | Privacy policy link text |
| `privacyLinkUrl` | string | `'/privacy'` | URL for the privacy policy |
| `onSubscribe` | function | `(email) => console.log('Subscribed:', email)` | Function called on form submission, should return a Promise |
