# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\component-ui.spec.ts >> Component UI Validation >> Carousel UI Testing
- Location: tests\ui\component-ui.spec.ts:12:5

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

  51045 pixels (ratio 0.01 of all image pixels) are different.

  Snapshot: Carousel\carousel-page-expected.png

Call log:
  - Expect "toHaveScreenshot(Carousel\\carousel-page-expected.png)" with timeout 15000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - 51045 pixels (ratio 0.01 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - 51045 pixels (ratio 0.01 of all image pixels) are different.

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to Main Content" [ref=e2]:
    - /url: "#main-content"
  - generic [ref=e5]:
    - generic [ref=e8]:
      - generic [ref=e11]:
        - heading "8 CARDS CAROUSEL" [level=3] [ref=e14]
        - separator [ref=e17]
        - group "Carousel" [ref=e22]:
          - generic [ref=e23]:
            - tabpanel "Slide 1" [ref=e24]:
              - generic [ref=e26]:
                - img "alt" [ref=e32]
                - generic [ref=e34]:
                  - paragraph [ref=e36]: Pre Title
                  - heading "Pensions savings statement (PSS)" [level=5] [ref=e37]
                  - paragraph [ref=e39]: Discover everything there is to know about pension savings statements on the M&G Wealth Adviser website, from why the PSS is sent to what action you need to take.
            - tabpanel "Slide 2" [ref=e40]:
              - generic [ref=e42]:
                - img "alt_ORCA" [ref=e48]
                - generic [ref=e50]:
                  - paragraph [ref=e52]: Pre Title
                  - heading "What we get asked about the Trust Registration Service" [level=5] [ref=e53]
                  - paragraph [ref=e55]: Get answers to the top 5 non run of the mill questions that M&G Wealth get asked about the Trust Registration Service (TRS).
            - tabpanel "Slide 3" [ref=e56]:
              - generic [ref=e58]:
                - img "alt" [ref=e64]
                - generic [ref=e66]:
                  - paragraph [ref=e68]: Pre Title
                  - 'heading "Loan trusts on death: who gets what?" [level=5] [ref=e69]'
                  - paragraph [ref=e71]: Find out how loan trusts are dealt with on death from M&G Wealth Adviser. Learn how the loan is treated for IHT, what happens if the loan is “waived” and more.
            - tabpanel "Slide 4" [ref=e72]:
              - generic [ref=e74]:
                - img "alt_PAINTER" [ref=e80]
                - generic [ref=e82]:
                  - paragraph [ref=e84]: Pre Title
                  - heading "It's the season for pensions savings statements" [level=5] [ref=e85]
                  - paragraph [ref=e87]: The leaves on the trees will be starting to go brown and disappear for the winter (aside from evergreens obvs!), but it’s also the season that clients may start to receive Pensions Savings Statements (PSS) for the 2022/23 tax year.
            - tabpanel "Slide 5" [ref=e88]:
              - generic [ref=e90]:
                - img "alt" [ref=e96]
                - generic [ref=e98]:
                  - paragraph [ref=e100]: Pre Title
                  - heading "Pensions savings statement (PSS)" [level=5] [ref=e101]
                  - paragraph [ref=e103]: Discover everything there is to know about pension savings statements on the M&G Wealth Adviser website, from why the PSS is sent to what action you need to take.
            - tabpanel "Slide 6" [ref=e104]:
              - generic [ref=e106]:
                - img "alttext" [ref=e112]
                - generic [ref=e114]:
                  - paragraph [ref=e116]: Pre Title
                  - heading "What we get asked about the Trust Registration Service" [level=5] [ref=e117]
                  - paragraph [ref=e119]: Get answers to the top 5 non run of the mill questions that M&G Wealth get asked about the Trust Registration Service (TRS).
            - tabpanel "Slide 7" [ref=e120]:
              - generic [ref=e122]:
                - img "alttext" [ref=e128]
                - generic [ref=e130]:
                  - paragraph [ref=e132]: Pre Title
                  - 'heading "Loan trusts on death: who gets what?" [level=5] [ref=e133]'
                  - paragraph [ref=e135]: Find out how loan trusts are dealt with on death from M&G Wealth Adviser. Learn how the loan is treated for IHT, what happens if the loan is “waived” and more.
            - tabpanel "Slide 8" [ref=e136]:
              - generic [ref=e138]:
                - img "alttextimg" [ref=e144]
                - generic [ref=e146]:
                  - paragraph [ref=e148]: Pre-title
                  - heading "It's the season for pensions savings statements" [level=5] [ref=e149]
                  - paragraph [ref=e151]: The leaves on the trees will be starting to go brown and disappear for the winter (aside from evergreens obvs!), but it’s also the season that clients may start to receive Pensions Savings Statements (PSS) for the 2022/23 tax year.
          - generic [ref=e152]:
            - button "arrow-back" [ref=e153] [cursor=pointer]
            - button "arrow-front" [ref=e164] [cursor=pointer]
      - generic [ref=e168]:
        - heading "7 CARDS CAROUSEL" [level=3] [ref=e171]
        - separator [ref=e174]
        - group "Carousel" [ref=e179]:
          - generic [ref=e180]:
            - tabpanel "Slide 1" [ref=e181]:
              - generic [ref=e183]:
                - img "alt" [ref=e189]
                - generic [ref=e191]:
                  - paragraph [ref=e193]: Pre Title
                  - heading "Pensions savings statement (PSS)" [level=5] [ref=e194]
                  - paragraph [ref=e196]: Discover everything there is to know about pension savings statements on the M&G Wealth Adviser website, from why the PSS is sent to what action you need to take.
            - tabpanel "Slide 2" [ref=e197]:
              - generic [ref=e199]:
                - img "alt_ORCA" [ref=e205]
                - generic [ref=e207]:
                  - paragraph [ref=e209]: Pre Title
                  - heading "What we get asked about the Trust Registration Service" [level=5] [ref=e210]
                  - paragraph [ref=e212]: Get answers to the top 5 non run of the mill questions that M&G Wealth get asked about the Trust Registration Service (TRS).
            - tabpanel "Slide 3" [ref=e213]:
              - generic [ref=e215]:
                - img "alt" [ref=e221]
                - generic [ref=e223]:
                  - paragraph [ref=e225]: Pre Title
                  - 'heading "Loan trusts on death: who gets what?" [level=5] [ref=e226]'
                  - paragraph [ref=e228]: Find out how loan trusts are dealt with on death from M&G Wealth Adviser. Learn how the loan is treated for IHT, what happens if the loan is “waived” and more.
            - tabpanel "Slide 4" [ref=e229]:
              - generic [ref=e231]:
                - img "alt_PAINTER" [ref=e237]
                - generic [ref=e239]:
                  - paragraph [ref=e241]: Pre Title
                  - heading "It's the season for pensions savings statements" [level=5] [ref=e242]
                  - paragraph [ref=e244]: The leaves on the trees will be starting to go brown and disappear for the winter (aside from evergreens obvs!), but it’s also the season that clients may start to receive Pensions Savings Statements (PSS) for the 2022/23 tax year.
            - tabpanel "Slide 5" [ref=e245]:
              - generic [ref=e247]:
                - img "alt" [ref=e253]
                - generic [ref=e255]:
                  - paragraph [ref=e257]: Pre Title
                  - heading "Pensions savings statement (PSS)" [level=5] [ref=e258]
                  - paragraph [ref=e260]: Discover everything there is to know about pension savings statements on the M&G Wealth Adviser website, from why the PSS is sent to what action you need to take.
            - tabpanel "Slide 6" [ref=e261]:
              - generic [ref=e263]:
                - img "alttext" [ref=e269]
                - generic [ref=e271]:
                  - paragraph [ref=e273]: Pre Title
                  - heading "What we get asked about the Trust Registration Service" [level=5] [ref=e274]
                  - paragraph [ref=e276]: Get answers to the top 5 non run of the mill questions that M&G Wealth get asked about the Trust Registration Service (TRS).
            - tabpanel "Slide 7" [ref=e277]:
              - generic [ref=e279]:
                - img "alttext" [ref=e285]
                - generic [ref=e287]:
                  - paragraph [ref=e289]: Pre Title
                  - 'heading "Loan trusts on death: who gets what?" [level=5] [ref=e290]'
                  - paragraph [ref=e292]: Find out how loan trusts are dealt with on death from M&G Wealth Adviser. Learn how the loan is treated for IHT, what happens if the loan is “waived” and more.
          - generic [ref=e293]:
            - button "arrow-back" [ref=e294] [cursor=pointer]
            - button "arrow-front" [ref=e304] [cursor=pointer]
      - generic [ref=e308]:
        - heading "6 CARDS CAROUSEL" [level=3] [ref=e311]
        - separator [ref=e314]
        - group "Carousel" [ref=e319]:
          - generic [ref=e320]:
            - tabpanel "Slide 1" [ref=e321]:
              - generic [ref=e323]:
                - img "alt" [ref=e329]
                - generic [ref=e331]:
                  - paragraph [ref=e333]: Pre Title
                  - heading "Pensions savings statement (PSS)" [level=5] [ref=e334]
                  - paragraph [ref=e336]: Discover everything there is to know about pension savings statements on the M&G Wealth Adviser website, from why the PSS is sent to what action you need to take.
            - tabpanel "Slide 2" [ref=e337]:
              - generic [ref=e339]:
                - img "alt_ORCA" [ref=e345]
                - generic [ref=e347]:
                  - paragraph [ref=e349]: Pre Title
                  - heading "What we get asked about the Trust Registration Service" [level=5] [ref=e350]
                  - paragraph [ref=e352]: Get answers to the top 5 non run of the mill questions that M&G Wealth get asked about the Trust Registration Service (TRS).
            - tabpanel "Slide 3" [ref=e353]:
              - generic [ref=e355]:
                - img "alt" [ref=e361]
                - generic [ref=e363]:
                  - paragraph [ref=e365]: Pre Title
                  - 'heading "Loan trusts on death: who gets what?" [level=5] [ref=e366]'
                  - paragraph [ref=e368]: Find out how loan trusts are dealt with on death from M&G Wealth Adviser. Learn how the loan is treated for IHT, what happens if the loan is “waived” and more.
            - tabpanel "Slide 4" [ref=e369]:
              - generic [ref=e371]:
                - img "alt_PAINTER" [ref=e377]
                - generic [ref=e379]:
                  - paragraph [ref=e381]: Pre Title
                  - heading "It's the season for pensions savings statements" [level=5] [ref=e382]
                  - paragraph [ref=e384]: The leaves on the trees will be starting to go brown and disappear for the winter (aside from evergreens obvs!), but it’s also the season that clients may start to receive Pensions Savings Statements (PSS) for the 2022/23 tax year.
            - tabpanel "Slide 5" [ref=e385]:
              - generic [ref=e387]:
                - img "alt" [ref=e393]
                - generic [ref=e395]:
                  - paragraph [ref=e397]: Pre Title
                  - heading "Pensions savings statement (PSS)" [level=5] [ref=e398]
                  - paragraph [ref=e400]: Discover everything there is to know about pension savings statements on the M&G Wealth Adviser website, from why the PSS is sent to what action you need to take.
            - tabpanel "Slide 6" [ref=e401]:
              - generic [ref=e403]:
                - img "alttext" [ref=e409]
                - generic [ref=e411]:
                  - paragraph [ref=e413]: Pre Title
                  - heading "What we get asked about the Trust Registration Service" [level=5] [ref=e414]
                  - paragraph [ref=e416]: Get answers to the top 5 non run of the mill questions that M&G Wealth get asked about the Trust Registration Service (TRS).
          - generic [ref=e417]:
            - button "arrow-back" [ref=e418] [cursor=pointer]
            - button "arrow-front" [ref=e427] [cursor=pointer]
      - generic [ref=e431]:
        - heading "5 CARDS CAROUSEL" [level=3] [ref=e434]
        - separator [ref=e437]
        - group "Carousel" [ref=e442]:
          - generic [ref=e443]:
            - tabpanel "Slide 1" [ref=e444]:
              - generic [ref=e446]:
                - img "alt" [ref=e452]
                - generic [ref=e454]:
                  - paragraph [ref=e456]: Pre Title
                  - heading "Pensions savings statement (PSS)" [level=5] [ref=e457]
                  - paragraph [ref=e459]: Discover everything there is to know about pension savings statements on the M&G Wealth Adviser website, from why the PSS is sent to what action you need to take.
            - tabpanel "Slide 2" [ref=e460]:
              - generic [ref=e462]:
                - img "alt_ORCA" [ref=e468]
                - generic [ref=e470]:
                  - paragraph [ref=e472]: Pre Title
                  - heading "What we get asked about the Trust Registration Service" [level=5] [ref=e473]
                  - paragraph [ref=e475]: Get answers to the top 5 non run of the mill questions that M&G Wealth get asked about the Trust Registration Service (TRS).
            - tabpanel "Slide 3" [ref=e476]:
              - generic [ref=e478]:
                - img "alt" [ref=e484]
                - generic [ref=e486]:
                  - paragraph [ref=e488]: Pre Title
                  - 'heading "Loan trusts on death: who gets what?" [level=5] [ref=e489]'
                  - paragraph [ref=e491]: Find out how loan trusts are dealt with on death from M&G Wealth Adviser. Learn how the loan is treated for IHT, what happens if the loan is “waived” and more.
            - tabpanel "Slide 4" [ref=e492]:
              - generic [ref=e494]:
                - img "alt_PAINTER" [ref=e500]
                - generic [ref=e502]:
                  - paragraph [ref=e504]: Pre Title
                  - heading "It's the season for pensions savings statements" [level=5] [ref=e505]
                  - paragraph [ref=e507]: The leaves on the trees will be starting to go brown and disappear for the winter (aside from evergreens obvs!), but it’s also the season that clients may start to receive Pensions Savings Statements (PSS) for the 2022/23 tax year.
            - tabpanel "Slide 5" [ref=e508]:
              - generic [ref=e510]:
                - img "alt" [ref=e516]
                - generic [ref=e518]:
                  - paragraph [ref=e520]: Pre Title
                  - heading "Pensions savings statement (PSS)" [level=5] [ref=e521]
                  - paragraph [ref=e523]: Discover everything there is to know about pension savings statements on the M&G Wealth Adviser website, from why the PSS is sent to what action you need to take.
          - generic [ref=e524]:
            - button "arrow-back" [ref=e525] [cursor=pointer]
            - button "arrow-front" [ref=e533] [cursor=pointer]
      - generic [ref=e537]:
        - heading "4 CARDS CAROUSEL" [level=3] [ref=e540]
        - separator [ref=e543]
        - group "Carousel" [ref=e548]:
          - generic [ref=e549]:
            - tabpanel "Slide 1" [ref=e550]:
              - generic [ref=e552]:
                - img "alt" [ref=e558]
                - generic [ref=e560]:
                  - paragraph [ref=e562]: Pre Title
                  - heading "Pensions savings statement (PSS)" [level=5] [ref=e563]
                  - paragraph [ref=e565]: Discover everything there is to know about pension savings statements on the M&G Wealth Adviser website, from why the PSS is sent to what action you need to take.
            - tabpanel "Slide 2" [ref=e566]:
              - generic [ref=e568]:
                - img "alt_ORCA" [ref=e574]
                - generic [ref=e576]:
                  - paragraph [ref=e578]: Pre Title
                  - heading "What we get asked about the Trust Registration Service" [level=5] [ref=e579]
                  - paragraph [ref=e581]: Get answers to the top 5 non run of the mill questions that M&G Wealth get asked about the Trust Registration Service (TRS).
            - tabpanel "Slide 3" [ref=e582]:
              - generic [ref=e584]:
                - img "alt" [ref=e590]
                - generic [ref=e592]:
                  - paragraph [ref=e594]: Pre Title
                  - 'heading "Loan trusts on death: who gets what?" [level=5] [ref=e595]'
                  - paragraph [ref=e597]: Find out how loan trusts are dealt with on death from M&G Wealth Adviser. Learn how the loan is treated for IHT, what happens if the loan is “waived” and more.
            - tabpanel "Slide 4" [ref=e598]:
              - generic [ref=e600]:
                - img "alt_PAINTER" [ref=e606]
                - generic [ref=e608]:
                  - paragraph [ref=e610]: Pre Title
                  - heading "It's the season for pensions savings statements" [level=5] [ref=e611]
                  - paragraph [ref=e613]: The leaves on the trees will be starting to go brown and disappear for the winter (aside from evergreens obvs!), but it’s also the season that clients may start to receive Pensions Savings Statements (PSS) for the 2022/23 tax year.
      - generic [ref=e616]:
        - heading "3 CARDS CAROUSEL" [level=3] [ref=e619]
        - separator [ref=e622]
        - group "Carousel" [ref=e627]:
          - generic [ref=e628]:
            - tabpanel "Slide 1" [ref=e629]:
              - generic [ref=e631]:
                - img "alt" [ref=e637]
                - generic [ref=e639]:
                  - paragraph [ref=e641]: Pre Title
                  - heading "Pensions savings statement (PSS)" [level=5] [ref=e642]
                  - paragraph [ref=e644]: Discover everything there is to know about pension savings statements on the M&G Wealth Adviser website, from why the PSS is sent to what action you need to take.
            - tabpanel "Slide 2" [ref=e645]:
              - generic [ref=e647]:
                - img "alt_ORCA" [ref=e653]
                - generic [ref=e655]:
                  - paragraph [ref=e657]: Pre Title
                  - heading "What we get asked about the Trust Registration Service" [level=5] [ref=e658]
                  - paragraph [ref=e660]: Get answers to the top 5 non run of the mill questions that M&G Wealth get asked about the Trust Registration Service (TRS).
            - tabpanel "Slide 3" [ref=e661]:
              - generic [ref=e663]:
                - img "alt" [ref=e669]
                - generic [ref=e671]:
                  - paragraph [ref=e673]: Pre Title
                  - 'heading "Loan trusts on death: who gets what?" [level=5] [ref=e674]'
                  - paragraph [ref=e676]: Find out how loan trusts are dealt with on death from M&G Wealth Adviser. Learn how the loan is treated for IHT, what happens if the loan is “waived” and more.
      - separator [ref=e679]
      - generic [ref=e682]:
        - heading "8 CARDS CAROUSEL" [level=3] [ref=e685]
        - separator [ref=e688]
        - group "Carousel" [ref=e693]:
          - generic [ref=e694]:
            - tabpanel "Slide 1" [ref=e695]:
              - generic [ref=e697]:
                - img "alt" [ref=e703]
                - generic [ref=e705]:
                  - paragraph [ref=e707]: Pre Title
                  - heading "Pensions savings statement (PSS)" [level=5] [ref=e708]
                  - paragraph [ref=e710]: Discover everything there is to know about pension savings statements on the M&G Wealth Adviser website, from why the PSS is sent to what action you need to take.
            - tabpanel "Slide 2" [ref=e711]:
              - generic [ref=e713]:
                - img "alt_ORCA" [ref=e719]
                - generic [ref=e721]:
                  - paragraph [ref=e723]: Pre Title
                  - heading "What we get asked about the Trust Registration Service" [level=5] [ref=e724]
                  - paragraph [ref=e726]: Get answers to the top 5 non run of the mill questions that M&G Wealth get asked about the Trust Registration Service (TRS).
            - tabpanel "Slide 3" [ref=e727]:
              - generic [ref=e729]:
                - img "alt" [ref=e735]
                - generic [ref=e737]:
                  - paragraph [ref=e739]: Pre Title
                  - 'heading "Loan trusts on death: who gets what?" [level=5] [ref=e740]'
                  - paragraph [ref=e742]: Find out how loan trusts are dealt with on death from M&G Wealth Adviser. Learn how the loan is treated for IHT, what happens if the loan is “waived” and more.
            - tabpanel "Slide 4" [ref=e743]:
              - generic [ref=e745]:
                - img "alt_PAINTER" [ref=e751]
                - generic [ref=e753]:
                  - paragraph [ref=e755]: Pre Title
                  - heading "It's the season for pensions savings statements" [level=5] [ref=e756]
                  - paragraph [ref=e758]: The leaves on the trees will be starting to go brown and disappear for the winter (aside from evergreens obvs!), but it’s also the season that clients may start to receive Pensions Savings Statements (PSS) for the 2022/23 tax year.
            - tabpanel "Slide 5" [ref=e759]:
              - generic [ref=e761]:
                - img "alt" [ref=e767]
                - generic [ref=e769]:
                  - paragraph [ref=e771]: Pre Title
                  - heading "Pensions savings statement (PSS)" [level=5] [ref=e772]
                  - paragraph [ref=e774]: Discover everything there is to know about pension savings statements on the M&G Wealth Adviser website, from why the PSS is sent to what action you need to take.
            - tabpanel "Slide 6" [ref=e775]:
              - generic [ref=e777]:
                - img "alttext" [ref=e783]
                - generic [ref=e785]:
                  - paragraph [ref=e787]: Pre Title
                  - heading "What we get asked about the Trust Registration Service" [level=5] [ref=e788]
                  - paragraph [ref=e790]: Get answers to the top 5 non run of the mill questions that M&G Wealth get asked about the Trust Registration Service (TRS).
            - tabpanel "Slide 7" [ref=e791]:
              - generic [ref=e793]:
                - img "alttext" [ref=e799]
                - generic [ref=e801]:
                  - paragraph [ref=e803]: Pre Title
                  - 'heading "Loan trusts on death: who gets what?" [level=5] [ref=e804]'
                  - paragraph [ref=e806]: Find out how loan trusts are dealt with on death from M&G Wealth Adviser. Learn how the loan is treated for IHT, what happens if the loan is “waived” and more.
            - tabpanel "Slide 8" [ref=e807]:
              - generic [ref=e809]:
                - img "alttextimg" [ref=e815]
                - generic [ref=e817]:
                  - paragraph [ref=e819]: Pre-title
                  - heading "It's the season for pensions savings statements" [level=5] [ref=e820]
                  - paragraph [ref=e822]: The leaves on the trees will be starting to go brown and disappear for the winter (aside from evergreens obvs!), but it’s also the season that clients may start to receive Pensions Savings Statements (PSS) for the 2022/23 tax year.
          - generic [ref=e823]:
            - button "arrow-back" [ref=e824] [cursor=pointer]
            - button "arrow-front" [ref=e835] [cursor=pointer]
      - generic [ref=e839]:
        - heading "7 CARDS CAROUSEL" [level=3] [ref=e842]
        - separator [ref=e845]
        - group "Carousel" [ref=e850]:
          - generic [ref=e851]:
            - tabpanel "Slide 1" [ref=e852]:
              - generic [ref=e854]:
                - img "alt" [ref=e860]
                - generic [ref=e862]:
                  - paragraph [ref=e864]: Pre Title
                  - heading "Pensions savings statement (PSS)" [level=5] [ref=e865]
                  - paragraph [ref=e867]: Discover everything there is to know about pension savings statements on the M&G Wealth Adviser website, from why the PSS is sent to what action you need to take.
            - tabpanel "Slide 2" [ref=e868]:
              - generic [ref=e870]:
                - img "alt_ORCA" [ref=e876]
                - generic [ref=e878]:
                  - paragraph [ref=e880]: Pre Title
                  - heading "What we get asked about the Trust Registration Service" [level=5] [ref=e881]
                  - paragraph [ref=e883]: Get answers to the top 5 non run of the mill questions that M&G Wealth get asked about the Trust Registration Service (TRS).
            - tabpanel "Slide 3" [ref=e884]:
              - generic [ref=e886]:
                - img "alt" [ref=e892]
                - generic [ref=e894]:
                  - paragraph [ref=e896]: Pre Title
                  - 'heading "Loan trusts on death: who gets what?" [level=5] [ref=e897]'
                  - paragraph [ref=e899]: Find out how loan trusts are dealt with on death from M&G Wealth Adviser. Learn how the loan is treated for IHT, what happens if the loan is “waived” and more.
            - tabpanel "Slide 4" [ref=e900]:
              - generic [ref=e902]:
                - img "alt_PAINTER" [ref=e908]
                - generic [ref=e910]:
                  - paragraph [ref=e912]: Pre Title
                  - heading "It's the season for pensions savings statements" [level=5] [ref=e913]
                  - paragraph [ref=e915]: The leaves on the trees will be starting to go brown and disappear for the winter (aside from evergreens obvs!), but it’s also the season that clients may start to receive Pensions Savings Statements (PSS) for the 2022/23 tax year.
            - tabpanel "Slide 5" [ref=e916]:
              - generic [ref=e918]:
                - img "alt" [ref=e924]
                - generic [ref=e926]:
                  - paragraph [ref=e928]: Pre Title
                  - heading "Pensions savings statement (PSS)" [level=5] [ref=e929]
                  - paragraph [ref=e931]: Discover everything there is to know about pension savings statements on the M&G Wealth Adviser website, from why the PSS is sent to what action you need to take.
            - tabpanel "Slide 6" [ref=e932]:
              - generic [ref=e934]:
                - img "alttext" [ref=e940]
                - generic [ref=e942]:
                  - paragraph [ref=e944]: Pre Title
                  - heading "What we get asked about the Trust Registration Service" [level=5] [ref=e945]
                  - paragraph [ref=e947]: Get answers to the top 5 non run of the mill questions that M&G Wealth get asked about the Trust Registration Service (TRS).
            - tabpanel "Slide 7" [ref=e948]:
              - generic [ref=e950]:
                - img "alttext" [ref=e956]
                - generic [ref=e958]:
                  - paragraph [ref=e960]: Pre Title
                  - 'heading "Loan trusts on death: who gets what?" [level=5] [ref=e961]'
                  - paragraph [ref=e963]: Find out how loan trusts are dealt with on death from M&G Wealth Adviser. Learn how the loan is treated for IHT, what happens if the loan is “waived” and more.
          - generic [ref=e964]:
            - button "arrow-back" [ref=e965] [cursor=pointer]
            - button "arrow-front" [ref=e975] [cursor=pointer]
      - generic [ref=e979]:
        - heading "6 CARDS CAROUSEL" [level=3] [ref=e982]
        - separator [ref=e985]
        - group "Carousel" [ref=e990]:
          - generic [ref=e991]:
            - tabpanel "Slide 1" [ref=e992]:
              - generic [ref=e994]:
                - img "alt" [ref=e1000]
                - generic [ref=e1002]:
                  - paragraph [ref=e1004]: Pre Title
                  - heading "Pensions savings statement (PSS)" [level=5] [ref=e1005]
                  - paragraph [ref=e1007]: Discover everything there is to know about pension savings statements on the M&G Wealth Adviser website, from why the PSS is sent to what action you need to take.
            - tabpanel "Slide 2" [ref=e1008]:
              - generic [ref=e1010]:
                - img "alt_ORCA" [ref=e1016]
                - generic [ref=e1018]:
                  - paragraph [ref=e1020]: Pre Title
                  - heading "What we get asked about the Trust Registration Service" [level=5] [ref=e1021]
                  - paragraph [ref=e1023]: Get answers to the top 5 non run of the mill questions that M&G Wealth get asked about the Trust Registration Service (TRS).
            - tabpanel "Slide 3" [ref=e1024]:
              - generic [ref=e1026]:
                - img "alt" [ref=e1032]
                - generic [ref=e1034]:
                  - paragraph [ref=e1036]: Pre Title
                  - 'heading "Loan trusts on death: who gets what?" [level=5] [ref=e1037]'
                  - paragraph [ref=e1039]: Find out how loan trusts are dealt with on death from M&G Wealth Adviser. Learn how the loan is treated for IHT, what happens if the loan is “waived” and more.
            - tabpanel "Slide 4" [ref=e1040]:
              - generic [ref=e1042]:
                - img "alt_PAINTER" [ref=e1048]
                - generic [ref=e1050]:
                  - paragraph [ref=e1052]: Pre Title
                  - heading "It's the season for pensions savings statements" [level=5] [ref=e1053]
                  - paragraph [ref=e1055]: The leaves on the trees will be starting to go brown and disappear for the winter (aside from evergreens obvs!), but it’s also the season that clients may start to receive Pensions Savings Statements (PSS) for the 2022/23 tax year.
            - tabpanel "Slide 5" [ref=e1056]:
              - generic [ref=e1058]:
                - img "alt" [ref=e1064]
                - generic [ref=e1066]:
                  - paragraph [ref=e1068]: Pre Title
                  - heading "Pensions savings statement (PSS)" [level=5] [ref=e1069]
                  - paragraph [ref=e1071]: Discover everything there is to know about pension savings statements on the M&G Wealth Adviser website, from why the PSS is sent to what action you need to take.
            - tabpanel "Slide 6" [ref=e1072]:
              - generic [ref=e1074]:
                - img "alttext" [ref=e1080]
                - generic [ref=e1082]:
                  - paragraph [ref=e1084]: Pre Title
                  - heading "What we get asked about the Trust Registration Service" [level=5] [ref=e1085]
                  - paragraph [ref=e1087]: Get answers to the top 5 non run of the mill questions that M&G Wealth get asked about the Trust Registration Service (TRS).
          - generic [ref=e1088]:
            - button "arrow-back" [ref=e1089] [cursor=pointer]
            - button "arrow-front" [ref=e1098] [cursor=pointer]
      - generic [ref=e1102]:
        - heading "5 CARDS CAROUSEL" [level=3] [ref=e1105]
        - separator [ref=e1108]
        - group "Carousel" [ref=e1113]:
          - generic [ref=e1114]:
            - tabpanel "Slide 1" [ref=e1115]:
              - generic [ref=e1117]:
                - img "alt" [ref=e1123]
                - generic [ref=e1125]:
                  - paragraph [ref=e1127]: Pre Title
                  - heading "Pensions savings statement (PSS)" [level=5] [ref=e1128]
                  - paragraph [ref=e1130]: Discover everything there is to know about pension savings statements on the M&G Wealth Adviser website, from why the PSS is sent to what action you need to take.
            - tabpanel "Slide 2" [ref=e1131]:
              - generic [ref=e1133]:
                - img "alt_ORCA" [ref=e1139]
                - generic [ref=e1141]:
                  - paragraph [ref=e1143]: Pre Title
                  - heading "What we get asked about the Trust Registration Service" [level=5] [ref=e1144]
                  - paragraph [ref=e1146]: Get answers to the top 5 non run of the mill questions that M&G Wealth get asked about the Trust Registration Service (TRS).
            - tabpanel "Slide 3" [ref=e1147]:
              - generic [ref=e1149]:
                - img "alt" [ref=e1155]
                - generic [ref=e1157]:
                  - paragraph [ref=e1159]: Pre Title
                  - 'heading "Loan trusts on death: who gets what?" [level=5] [ref=e1160]'
                  - paragraph [ref=e1162]: Find out how loan trusts are dealt with on death from M&G Wealth Adviser. Learn how the loan is treated for IHT, what happens if the loan is “waived” and more.
            - tabpanel "Slide 4" [ref=e1163]:
              - generic [ref=e1165]:
                - img "alt_PAINTER" [ref=e1171]
                - generic [ref=e1173]:
                  - paragraph [ref=e1175]: Pre Title
                  - heading "It's the season for pensions savings statements" [level=5] [ref=e1176]
                  - paragraph [ref=e1178]: The leaves on the trees will be starting to go brown and disappear for the winter (aside from evergreens obvs!), but it’s also the season that clients may start to receive Pensions Savings Statements (PSS) for the 2022/23 tax year.
            - tabpanel "Slide 5" [ref=e1179]:
              - generic [ref=e1181]:
                - img "alt" [ref=e1187]
                - generic [ref=e1189]:
                  - paragraph [ref=e1191]: Pre Title
                  - heading "Pensions savings statement (PSS)" [level=5] [ref=e1192]
                  - paragraph [ref=e1194]: Discover everything there is to know about pension savings statements on the M&G Wealth Adviser website, from why the PSS is sent to what action you need to take.
          - generic [ref=e1195]:
            - button "arrow-back" [ref=e1196] [cursor=pointer]
            - button "arrow-front" [ref=e1204] [cursor=pointer]
      - generic [ref=e1208]:
        - heading "4 CARDS CAROUSEL" [level=3] [ref=e1211]
        - separator [ref=e1214]
        - group "Carousel" [ref=e1219]:
          - generic [ref=e1220]:
            - tabpanel "Slide 1" [ref=e1221]:
              - generic [ref=e1223]:
                - img "alt" [ref=e1229]
                - generic [ref=e1231]:
                  - paragraph [ref=e1233]: Pre Title
                  - heading "Pensions savings statement (PSS)" [level=5] [ref=e1234]
                  - paragraph [ref=e1236]: Discover everything there is to know about pension savings statements on the M&G Wealth Adviser website, from why the PSS is sent to what action you need to take.
            - tabpanel "Slide 2" [ref=e1237]:
              - generic [ref=e1239]:
                - img "alt_ORCA" [ref=e1245]
                - generic [ref=e1247]:
                  - paragraph [ref=e1249]: Pre Title
                  - heading "What we get asked about the Trust Registration Service" [level=5] [ref=e1250]
                  - paragraph [ref=e1252]: Get answers to the top 5 non run of the mill questions that M&G Wealth get asked about the Trust Registration Service (TRS).
            - tabpanel "Slide 3" [ref=e1253]:
              - generic [ref=e1255]:
                - img "alt" [ref=e1261]
                - generic [ref=e1263]:
                  - paragraph [ref=e1265]: Pre Title
                  - 'heading "Loan trusts on death: who gets what?" [level=5] [ref=e1266]'
                  - paragraph [ref=e1268]: Find out how loan trusts are dealt with on death from M&G Wealth Adviser. Learn how the loan is treated for IHT, what happens if the loan is “waived” and more.
            - tabpanel "Slide 4" [ref=e1269]:
              - generic [ref=e1271]:
                - img "alt_PAINTER" [ref=e1277]
                - generic [ref=e1279]:
                  - paragraph [ref=e1281]: Pre Title
                  - heading "It's the season for pensions savings statements" [level=5] [ref=e1282]
                  - paragraph [ref=e1284]: The leaves on the trees will be starting to go brown and disappear for the winter (aside from evergreens obvs!), but it’s also the season that clients may start to receive Pensions Savings Statements (PSS) for the 2022/23 tax year.
      - generic [ref=e1287]:
        - heading "3 CARDS CAROUSEL" [level=3] [ref=e1290]
        - separator [ref=e1293]
        - group "Carousel" [ref=e1298]:
          - generic [ref=e1299]:
            - tabpanel "Slide 1" [ref=e1300]:
              - generic [ref=e1302]:
                - img "alt" [ref=e1308]
                - generic [ref=e1310]:
                  - paragraph [ref=e1312]: Pre Title
                  - heading "Pensions savings statement (PSS)" [level=5] [ref=e1313]
                  - paragraph [ref=e1315]: Discover everything there is to know about pension savings statements on the M&G Wealth Adviser website, from why the PSS is sent to what action you need to take.
            - tabpanel "Slide 2" [ref=e1316]:
              - generic [ref=e1318]:
                - img "alt_ORCA" [ref=e1324]
                - generic [ref=e1326]:
                  - paragraph [ref=e1328]: Pre Title
                  - heading "What we get asked about the Trust Registration Service" [level=5] [ref=e1329]
                  - paragraph [ref=e1331]: Get answers to the top 5 non run of the mill questions that M&G Wealth get asked about the Trust Registration Service (TRS).
            - tabpanel "Slide 3" [ref=e1332]:
              - generic [ref=e1334]:
                - img "alt" [ref=e1340]
                - generic [ref=e1342]:
                  - paragraph [ref=e1344]: Pre Title
                  - 'heading "Loan trusts on death: who gets what?" [level=5] [ref=e1345]'
                  - paragraph [ref=e1347]: Find out how loan trusts are dealt with on death from M&G Wealth Adviser. Learn how the loan is treated for IHT, what happens if the loan is “waived” and more.
    - separator [ref=e1350]
    - separator [ref=e1353]
  - img [ref=e1354]
```

# Test source

```ts
  1   | import { Page, Locator, expect } from '@playwright/test';
  2   | import PageElements from '../../page-objects/page-elements/mandg-page-elements.json' with { type: 'json' };
  3   | 
  4   | export class UICommons {
  5   |     /**
  6   |      * Performs visual testing (screenshot comparison) on the entire page.
  7   |      * 
  8   |      * @param page The Playwright Page instance.
  9   |      * @param screenshotName The name of the expected screenshot (e.g., 'home-page.png' or ['Button', 'button-page.png']).
  10  |      * @param options Optional configuration for the screenshot comparison (e.g., masking elements, threshold).
  11  |      */
  12  |     public static async assertFullPage(page: Page, screenshotName: string | string[], options?: any): Promise<void> {
> 13  |         await expect(page).toHaveScreenshot(screenshotName, {
      |                            ^ Error: expect(page).toHaveScreenshot(expected) failed
  14  |             fullPage: true,
  15  |             maxDiffPixelRatio: 0.001,
  16  |             timeout: 15000,
  17  |             ...options
  18  |         });
  19  |     }
  20  | 
  21  | 
  22  |     public static async checkAccessDeniedError(page: Page): Promise<boolean> {
  23  |         const isAccessDenied = await page.locator("h1", { hasText: "Access Denied" }).isVisible({ timeout: 1000 });
  24  | 
  25  |         if (isAccessDenied) {
  26  |             await expect(page.locator("body")).toContainText("You don't have permission to access");
  27  | 
  28  |             // Verify that the M&G application is NOT rendered
  29  |             await expect(page.locator("#container")).toHaveCount(0);
  30  | 
  31  |             // Optional: verify there is no AEM application container either
  32  |             await expect(page.locator(".cmp-container")).toHaveCount(0);
  33  |             return true;
  34  |         }
  35  | 
  36  |         return false;
  37  |     }
  38  | 
  39  |     public static async checkPageNotAvailableError(page: Page): Promise<boolean> {
  40  |         const isPageNotAvailable = await page.locator("//h2[contains(normalize-space(), 'Looks like this page isn’t available')]").isVisible({ timeout: 1000 });
  41  | 
  42  |         if (isPageNotAvailable) {
  43  |             await expect(page.locator("body")).toContainText("You can return home or search again.");
  44  |             return true;
  45  |         }
  46  | 
  47  |         return false;
  48  |     }
  49  | 
  50  | 
  51  |     public static async ensurePageReadyForTesting(page: Page): Promise<void> {
  52  |         // SMARTER APPROACH:
  53  |         // We use Promise.all to evaluate all 3 checks concurrently.
  54  |         // checkAccessDeniedError and checkPageNotAvailableError instantly return false on a healthy page!
  55  | 
  56  |         const [isAccessDenied, isPageNotAvailable, isCookieBannerVisible] = await Promise.all([
  57  |             this.checkAccessDeniedError(page),
  58  |             this.checkPageNotAvailableError(page),
  59  |             page.locator(PageElements['accept-cookies-button']).isVisible()
  60  |         ]);
  61  | 
  62  |         if (isAccessDenied) {
  63  |             throw new Error("Access denied observed");
  64  |         }
  65  | 
  66  |         if (isPageNotAvailable) {
  67  |             throw new Error("404 page not found observed");
  68  |         }
  69  | 
  70  |         if (isCookieBannerVisible) {
  71  |             await page.locator(PageElements['accept-cookies-button']).click();
  72  |             await page.waitForTimeout(500); // Allow time for the banner to animate out
  73  |         }
  74  | 
  75  |         console.log("page is good to go");
  76  |     }
  77  | 
  78  | 
  79  | 
  80  |     public static async freezeFlourish(page: Page): Promise<void> {
  81  | 
  82  |         await page.evaluate(() => {
  83  | 
  84  |             document
  85  |                 .querySelectorAll(".fl-scrolly-wrapper")
  86  |                 .forEach((wrapper: any) => {
  87  | 
  88  |                     const height = wrapper.getBoundingClientRect().height;
  89  | 
  90  |                     wrapper.style.height = `${height}px`;
  91  |                     wrapper.style.minHeight = `${height}px`;
  92  |                     wrapper.style.maxHeight = `${height}px`;
  93  |                     wrapper.style.overflow = "hidden";
  94  |                 });
  95  | 
  96  |         });
  97  | 
  98  |         await page.waitForTimeout(1000);
  99  |     }
  100 | 
  101 | 
  102 |     /**
  103 | * Replaces all Flourish Story components with a deterministic placeholder.
  104 | *
  105 | * Unlike network stubbing, this works consistently across Chromium,
  106 | * Firefox and WebKit because it modifies the DOM after the page has loaded.
  107 | *
  108 | * Only Story components (.fl-scrolly-wrapper) are replaced.
  109 | * Standard Flourish charts remain untouched.
  110 | */
  111 |     public static async stubFlourishStories(page: Page): Promise<void> {
  112 | 
  113 |         await page.evaluate(() => {
```