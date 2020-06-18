import React from 'react'
import Link from 'next/link'

import { Box, Typography, Button } from '@island.is/island-ui/core'

import packageSvg from '@island.is/gjafakort-web/assets/ferdagjof-pakki.svg'
import { useI18n } from '../../../../i18n'

function GiftCTA() {
  const {
    t: {
      home: { cta: t },
      routes,
    },
  } = useI18n()

  return (
    <Box>
      <Box
        background="purple100"
        padding={4}
        marginBottom={3}
        borderRadius="standard"
      >
        <Box marginBottom={2}>
          <Typography variant="h4">{t.users.label}</Typography>
        </Box>
        <Link href={routes.users.home}>
          <span>
            <Button width="fluid">{t.users.content}</Button>
          </span>
        </Link>
      </Box>
      <Box
        background="purple100"
        padding={4}
        marginBottom={3}
        borderRadius="standard"
      >
        <Box marginBottom={2}>
          <Typography variant="h4">{t.companies.label}</Typography>
        </Box>
        <Link href={routes.companies.home}>
          <span>
            <Button width="fluid" variant="ghost">
              {t.companies.content}
            </Button>
          </span>
        </Link>
      </Box>
      <Box
        textAlign="center"
        padding={3}
        border="standard"
        borderRadius="standard"
      >
        <img src={packageSvg} alt="" />
      </Box>
    </Box>
  )
}

export default GiftCTA
