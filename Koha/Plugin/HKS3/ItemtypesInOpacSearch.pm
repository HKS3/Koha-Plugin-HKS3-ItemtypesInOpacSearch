package Koha::Plugin::HKS3::ItemtypesInOpacSearch;
use Modern::Perl;
use Koha::ContentSecurityPolicy;

use base qw(Koha::Plugins::Base);

our $VERSION = "0.0.4";

our $metadata = {
    name            => 'ItemtypesInOpacSearch',
    author          => 'HKS3 Tadeusz Sośnierz',
    date_authored   => '2026-11-20',
    date_updated    => '2026-11-20',
    minimum_version => '24.11.00.000',
    maximum_version => undef,
    version         => $VERSION,
    description     => 'Add an itemtype selector on the regular OPAC search bar'
};

sub new {
    my ( $class, $args ) = @_;

    $args->{metadata} = $metadata;
    $args->{metadata}{class} = $class;

    my $self = $class->SUPER::new($args);
    return $self;
}

sub opac_js {
    my $self = shift;

    my $js = $self->mbf_read('opac.js');
    my $nonce = Koha::ContentSecurityPolicy->new->get_nonce;

    return qq|
<script nonce="$nonce">
    \$(document).ready(function() {
        $js
    });
</script>
    |;
}

1;
