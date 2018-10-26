tikonnek    Aylor Lab - 965
yeminlan    Bartolomei Lab - 898
bongsoopark    Biswal Lab - 690
rygielch    Dolinoy Lab - 1820
ttsai    Dolinoy Lab - 24
Angelo Meliton    Mutlu Lab - 0
Mutlu    Mutlu Lab - 758
MutluLab    Mutlu Lab - 274
robhamanaka    Mutlu Lab - 1
jianrong.dong@bcm.edu    Walker Lab - 1068
tkatz    Walker Lab - 3
ecpehrsson    Wang Lab - 1
Ivy(Yujie) Chen    Wang Lab
yiran    Wang Lab - 0
Yiran    Wang Lab - 0
Yiran Hou    Wang Lab - 0
liyq    Zhibin Lab - 158
Musa    Zhibin Lab - 0
mwatfa1@jhu.edu    Zhibin Lab - 0

MATCH (n {user: "tikonnek"}) WITH COLLECT(n) as records UNWIND records as record SET record.lab = "Aylor Lab"
MATCH (n {user: "yeminlan"}) WITH COLLECT(n) as records UNWIND records as record SET record.lab = "Bartolomei Lab"
MATCH (n {user: "bongsoopark"}) WITH COLLECT(n) as records UNWIND records as record SET record.lab = "Biswal Lab"
MATCH (n {user: "rygielch"}) WITH COLLECT(n) as records UNWIND records as record SET record.lab = "Dolinoy Lab"
MATCH (n {user: "ttsai"}) WITH COLLECT(n) as records UNWIND records as record SET record.lab = "Dolinoy Lab"
MATCH (n {user: "Mutlu"}) WITH COLLECT(n) as records UNWIND records as record SET record.lab = "Mutlu Lab"
MATCH (n {user: "MutluLab"}) WITH COLLECT(n) as records UNWIND records as record SET record.lab = "Mutlu Lab"
MATCH (n {user: "robhamanaka"}) WITH COLLECT(n) as records UNWIND records as record SET record.lab = "Mutlu Lab"
MATCH (n {user: "jianrong.dong@bcm.edu"}) WITH COLLECT(n) as records UNWIND records as record SET record.lab = "Walker Lab"
MATCH (n {user: "tkatz"}) WITH COLLECT(n) as records UNWIND records as record SET record.lab = "Walker Lab"
MATCH (n {user: "liyq"}) WITH COLLECT(n) as records UNWIND records as record SET record.lab = "Zhibin Lab"

MATCH (n {user: "Angelo Meliton"}) WITH COLLECT(n) as records UNWIND records as record SET record.lab = "Mutlu Lab"
MATCH (n {user: "Musa"}) WITH COLLECT(n) as records UNWIND records as record SET record.lab = "Zhibin Lab"
MATCH (n {user: "mwatfa1@jhu.edu"}) WITH COLLECT(n) as records UNWIND records as record SET record.lab = "Zhibin Lab"
MATCH (n {user: "ecpehrsson"}) WITH COLLECT(n) as records UNWIND records as record SET record.lab = "Wang Lab"
MATCH (n {user: "Yiran"}) WITH COLLECT(n) as records UNWIND records as record SET record.lab = "Wang Lab"
MATCH (n {user: "Yiran Hou"}) WITH COLLECT(n) as records UNWIND records as record SET record.lab = "Wang Lab"


MATCH (n {user: "tikonnek"}) RETURN n.accession, n.user, n.lab
MATCH (n {user: "yeminlan"}) RETURN n.accession, n.user, n.lab
MATCH (n {user: "bongsoopark"}) RETURN n.accession, n.user, n.lab
MATCH (n {user: "rygielch"}) RETURN n.accession, n.user, n.lab
MATCH (n {user: "ttsai"}) RETURN n.accession, n.user, n.lab
MATCH (n {user: "Angelo Meliton"}) RETURN n.accession, n.user, n.lab
MATCH (n {user: "Mutlu"}) RETURN n.accession, n.user, n.lab
MATCH (n {user: "MutluLab"}) RETURN n.accession, n.user, n.lab
MATCH (n {user: "robhamanaka"}) RETURN n.accession, n.user, n.lab
MATCH (n {user: "jianrong.dong@bcm.edu"}) RETURN n.accession, n.user, n.lab
MATCH (n {user: "tkatz"}) RETURN n.accession, n.user, n.lab
MATCH (n {user: "liyq"}) RETURN n.accession, n.user, n.lab
MATCH (n {user: "Musa"}) RETURN n.accession, n.user, n.lab
MATCH (n {user: "ecpehrsson"}) RETURN n.accession, n.user, n.lab
MATCH (n {user: "Yiran"}) RETURN n.accession, n.user, n.lab
MATCH (n {user: "Yiran Hou"}) RETURN n.accession, n.user, n.lab
MATCH (n {user: "mwatfa1@jhu.edu"}) RETURN n.accession, n.user, n.lab